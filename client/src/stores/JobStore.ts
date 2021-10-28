import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { Job } from "../models/Job";
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
      runInAction(() => {
        this.jobs.push(job);
      });
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  loadJobs = async () => {
    try {
      const jobsResponse = await agent.jobMangements.list();
      runInAction(() => {
        this.jobs = [];
        jobsResponse.forEach((p) => {
          this.jobs.push(p);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  setDeleteJob = async (id: string) => {
    agent.jobMangements.delete(id);
    try {
      this.jobs = [...this.jobs.filter((j) => j.id !== id)];
    } catch (error) {
      console.log(error);
    }
  };
}
