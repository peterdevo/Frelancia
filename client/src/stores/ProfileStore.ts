import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { JobLink } from "../models/JobLink";
import { JobProfile } from "../models/JobProfile";
import { toJS } from "mobx";
import { Niche } from "../models/Niche";
const { v4: uuid } = require("uuid");

export default class ProfileStore {
  jobProfiles: JobProfile[] = [];
  selectedProfile: JobProfile = {
    id: "",
    nicheId: 1,
    profileName: "",
    userId: "",
    jobLinks: [
      {
        url: "",
      },
    ],
    photos: [],
    description: "",
    createAt: new Date(Date.now()),
  };
  listOfNiches: Niche[] = [];
  isLoading = false;

  files: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadProfiles = async () => {
    try {
      const profiles = await agent.profileMangements.list();
      console.log(toJS(profiles));
      runInAction(() => {
        this.jobProfiles = profiles;
      });
    } catch (error) {
      throw error;
    }
  };

  getNiche = async () => {
    try {
      const niches = await agent.profileMangements.listNiche();
      runInAction(() => {
        this.listOfNiches = niches;
      });
    } catch (error) {
      throw error;
    }
  };

  addPhoto = async (jobProfileId: string, file: File) => {
    try {
      this.setLoading(true);
      const responsePhoto = await agent.profileMangements.addJobProfilePhoto(
        jobProfileId,
        file
      );
      runInAction(() => {
        this.jobProfiles.forEach((jp) => {
          if (jp.id === jobProfileId) {
            jp.photos.push(responsePhoto);
          }
        });
      });

      this.setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  deletePhoto = async (jobProfileId: string, deleteId: string) => {
    try {
      this.setLoading(true);
      await agent.profileMangements.deleteJobProfilePhoto(
        jobProfileId,
        deleteId
      );
      runInAction(() => {
        this.selectedProfile.photos = this.selectedProfile.photos.filter(
          (p) => p.publicId !== deleteId
        );
        this.jobProfiles.forEach((jp) => {
          if (jp.id === jobProfileId) {
            jp.photos = this.selectedProfile.photos;
          }
        });
      });

      this.setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  createJobProfile = async (jobProfile: JobProfile, files: File[]) => {
    try {
      jobProfile.id = uuid;
      await agent.profileMangements.create(jobProfile, files);
      runInAction(() => {
        this.jobProfiles.push(jobProfile);
      });
      this.setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  editJobProfile = async (jobProfile: JobProfile) => {
    try {
      this.setLoading(true);
      await agent.profileMangements.edit(jobProfile);
      runInAction(() => {
        let index = this.jobProfiles.findIndex((jp) => jp.id === jobProfile.id);
        this.jobProfiles[index] = jobProfile;
        this.selectedProfile = jobProfile;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteJobProfile = async (jobProfileId: string) => {
    try {
      this.setLoading(true);
      await agent.profileMangements.delete(jobProfileId);
      runInAction(() => {
        this.jobProfiles = this.jobProfiles.filter(
          (jp) => jp.id !== jobProfileId
        );
        this.selectedProfile = {
          id: "",
          nicheId: 1,
          profileName: "",
          userId: "",
          jobLinks: [
            {
              url: "",
            },
          ],
          photos: [],
          description: "",
          createAt: new Date(Date.now()),
        };
      });
      this.setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  setUpdatedLinks(jobLinks: JobLink[]) {
    this.selectedProfile.jobLinks = jobLinks;
  }

  setSelectProfile = (jp: JobProfile) => {
    this.selectedProfile = jp;
  };

  setFiles(file: any) {
    this.files.push(file);
  }
  deleteFiles(index: number) {
    runInAction(() => {
      this.files.forEach((e) => {
        this.files.splice(index, 1);
      });
      if (this.files.includes(undefined)) {
        this.files = [];
      }
    });
  }

  setLoading = (state: boolean) => {
    this.isLoading = state;
  };
}
