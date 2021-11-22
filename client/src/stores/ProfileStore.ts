import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { JobLink } from "../models/JobLink";
import { JobProfile } from "../models/JobProfile";
import { toJS } from "mobx";
import { Niche } from "../models/Niche";
import { store } from "./store";
const { v4: uuid } = require("uuid");

export default class ProfileStore {
  jobProfiles: JobProfile[] = [];
  selectedProfile: JobProfile = {
    id: "",
    nicheId: 1,
    profileName: "",
    userId: "",
    jobLinks:[
      {
        url:""
      }
    ],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };
  listOfNiches: Niche[] = [];
  isLoading = false;
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
      console.log(error);
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

  createJobProfile = async (jobProfile: JobProfile) => {
    this.setLoading(true);
    try {
      jobProfile.id = uuid;
      await agent.profileMangements.create(jobProfile);
      runInAction(() => {
        this.jobProfiles.push(jobProfile);
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  editJobProfile = async (jobProfile: JobProfile) => {
    try {
      this.setLoading(true);
      await agent.profileMangements.edit(jobProfile);

      runInAction(() => {
        let index = this.jobProfiles.findIndex((jp) => jp.id === jobProfile.id);
        this.jobProfiles[index] = jobProfile;
        this.setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  setUpdatedLinks(jobLinks: JobLink[]) {
    this.selectedProfile.jobLinks = jobLinks;
  }

  setSelectProfile = (jp: JobProfile) => {
    this.selectedProfile = jp;
  };

  setLoading = (state: boolean) => {
    this.isLoading = state;
  };
}
