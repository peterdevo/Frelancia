import { makeAutoObservable } from "mobx";
import agent from "../API/agent";
import { JobProfile } from "../models/JobProfile";
const { v4: uuid } = require("uuid");

export default class ProfileStore {
  jobProfiles: JobProfile[] = [];
  selectedProfile: JobProfile = {
    id: "",
    nicheId: 1,
    jobLinks: [],
    photos: "",
    description: "",
    createAt: new Date(Date.now()),
  };
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  loadProfiles = async () => {
    this.setLoading(true);
    try {
      const profiles = await agent.profileMangements.list();
      profiles.forEach((p) => {
        this.jobProfiles.push(p);
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  setLoading = (state: boolean) => {
    this.isLoading = state;
  };

  createJobProfile = async (jobProfile: JobProfile) => {
    this.setLoading(true);
    try {
      jobProfile.id = uuid;
      agent.profileMangements.create(jobProfile);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  setSelectProfile = (e: any) => {
    console.log(e);
    const result = this.jobProfiles.find((jp) => jp.id === e);

    if (result !== undefined) {
      this.selectedProfile = result;
    }

   
  };
}
