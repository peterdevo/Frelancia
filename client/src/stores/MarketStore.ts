import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { JobDetail, JobIntroduction } from "../models/JobMarket";


export default class MarketStore {
  constructor() {
    makeAutoObservable(this);
  }

  jobs: JobIntroduction[] = [];
  jobDetail = {} as JobDetail;

  getJobs = async () => {
    try {
      const response = await agent.market.getJobs();
      runInAction(() => {
        this.jobs = response;
      });
    } catch (error) {
      throw error;
    }
  };

  getJobDetail = async (id: string) => {
    try {
      const response = await agent.market.getJobDetail(id);
      runInAction(() => {
        this.jobDetail = response;
      });
    } catch (error) {
      throw error;
    }
  };
}
