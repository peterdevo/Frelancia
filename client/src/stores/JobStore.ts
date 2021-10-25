import { makeAutoObservable } from "mobx";
import agent from "../API/agent";
import { Job } from "../models/Job";
const { v4: uuid } = require("uuid");

export default class JobStore {
  jobs: Job[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  createJob = async (job: Job) => {
    this.setLoading(true);
    try {
      job.id = uuid;
      agent.JobMangements.create(job);

      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  loadJobs = async () => {
    try {
      const jobsResponse = await agent.JobMangements.list();
      jobsResponse.forEach((job) => {
        this.jobs.push(job);
      });
    } catch (error) {
      console.log(error)
    }
  };

  setLoading = (state: boolean) => {
    return (this.isLoading = state);
  };
}
