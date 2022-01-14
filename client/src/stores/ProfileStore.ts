import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../API/agent";
import { JobLink } from "../models/JobLink";
import { JobProfile } from "../models/JobProfile";
import { toJS } from "mobx";
import { Niche } from "../models/Niche";

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
    jobFiles: [],
    photos: [],
    description: "",
    createAt: new Date(Date.now()),
  };
  listOfNiches: Niche[] = [];
  isLoading = false;
  imageFiles: any[] = [];
  jobFiles: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadProfiles = async () => {
    try {
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
        jobFiles: [],
        photos: [],
        description: "",
        createAt: new Date(Date.now()),
      };
      this.jobProfiles = [];
      const profiles = await agent.profileMangements.list();
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

  createJobProfile = async (
    jobProfile: JobProfile,
    imageFiles: File[],
    jobFiles: File[]
  ) => {
    try {
      await agent.profileMangements.create(jobProfile, imageFiles, jobFiles);
      runInAction(() => {
        this.jobProfiles.push(jobProfile);
      });
      toast.success("Profile has successfully created.");
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
        toast.success("Profile has successfully updated.");
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
          jobFiles: [],
          photos: [],
          description: "",
          createAt: new Date(Date.now()),
        };
      });
      this.setLoading(false);
      toast.success("Profile has successfully deleted.");
    } catch (error) {
      throw error;
    }
  };

  addLink = async (jobProfileId: string, jobLink: JobLink) => {
    try {
      const response = await agent.profileMangements.addLink(
        jobProfileId,
        jobLink
      );
      this.selectedProfile.jobLinks.push(response);
    } catch (error) {
      throw error;
    }
  };
  deleteUpdatedLink = async (id: number) => {
    try {
      await agent.profileMangements.deleteLink(id);
      runInAction(() => {
        this.selectedProfile.jobLinks = this.selectedProfile.jobLinks.filter(
          (e) => e.id !== id
        );
      });

      console.log(toJS(this.selectedProfile.jobLinks));
    } catch (error) {
      throw error;
    }
  };

  addFile = async (jobProfileId: string, file: File) => {
    try {
      const response = await agent.profileMangements.AddFile(
        jobProfileId,
        file
      );

      this.selectedProfile.jobFiles.push(response);
    } catch (error) {
      throw error;
    }
  };

  deleteFile = async (jobFileId: number) => {
    try {
      await agent.profileMangements.deleteFile(jobFileId);
      runInAction(() => {
        this.selectedProfile.jobFiles = this.selectedProfile.jobFiles.filter(
          (e) => e.id !== jobFileId
        );
      });
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

  setJobFiles(file: File) {
    if (file == undefined) return;
    runInAction(() => {
      this.jobFiles.push(file);
    });

    console.log("hello", toJS(this.jobFiles));
  }
  setDeleteJobFiles(index: number) {
    runInAction(() => {
      this.jobFiles.forEach((e) => {
        this.jobFiles.splice(index, 1);
      });
    });
    console.log(toJS(this.jobFiles));
  }

  setImageFiles(file: any) {
    if (file === undefined) return;
    this.imageFiles.push(file);
  }

  setDeleteImageFiles(index: number) {
    runInAction(() => {
      this.imageFiles.forEach((e) => {
        this.imageFiles.splice(index, 1);
      });
    });
  }

  setLoading = (state: boolean) => {
    this.isLoading = state;
  };
}
