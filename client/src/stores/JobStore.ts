import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
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
      await agent.jobMangements.create(job);
      runInAction(() => {
        this.jobs.push(job);
      });
      toast.success("Job has successfully created.");
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
      throw error;
    }
  };

  setActivate = async (job: Job) => {
    this.selectedJob = job;
    this.selectedJob.isActive = true;
    try {
      await agent.jobMangements.edit(this.selectedJob);
    } catch (error) {
      throw error;
    }
  };

  setDeleteJob = async (id: string) => {
    await agent.jobMangements.delete(id);
    try {
      runInAction(() => {
        this.jobs = [...this.jobs.filter((j) => j.id !== id)];
      });
      toast.success("Job has successfully deleted.");
    } catch (error) {
      throw error;
    }
  };
}
