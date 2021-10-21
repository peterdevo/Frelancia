import { makeAutoObservable } from "mobx";
import agent from "../API/agent";
import { JobProfile } from "../models/JobProfile";
const { v4: uuid} = require('uuid');

export default class ProfileStore {
  jobProfiles: JobProfile[] = [];
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  loadProfiles = async () => {
    this.setLoading(true);
    try {
      const profiles = await agent.profileJobs.list();
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
      jobProfile.id=uuid;
      agent.profileJobs.create(jobProfile);
      this.setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };
}
