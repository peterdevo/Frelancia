import { makeAutoObservable } from "mobx";
import agent from "../API/agent";
import { Job } from "../models/Job";
import { toJS } from "mobx";
const { v4: uuid } = require("uuid");

export default class JobStore {
  jobs: Job[] = [];
  isLoading = false;
  isActive: boolean = true;
  selectedJob: Job = {
    id: "",
    title: "",
    jobProfile: {
      id: "",
      nicheId: 1,
      jobLinks: [],
      photos: "",
      description: "",
    },
    jobProfileId: "",
    introduction: "",
    isShared: true,
    isActive: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  createJob = async (job: Job) => {
    this.setLoading(true);
    try {
      job.id = uuid;
      await agent.jobMangements.create(job);

      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  loadJobs = async () => {
    this.setLoading(true);
    try {
      const jobsResponse = await agent.jobMangements.list();
      jobsResponse.forEach((p) => {
        this.jobs.push(p);
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  setActivation = async () => {};

  setLoading = (state: boolean) => {
    return (this.isLoading = state);
  };

  setDeActivate = async (job: Job) => {
    this.selectedJob = job;
    this.selectedJob.isActive = false;
    try {
      await agent.jobMangements.edit(this.selectedJob);
    } catch (error) {
      console.log(error);
    }
  };

  setActivate = async (job: Job) => {
    this.selectedJob = job;
    this.selectedJob.isActive = true;
    try {
      await agent.jobMangements.edit(this.selectedJob);
    } catch (error) {
      console.log(error);
    }
  };
}
