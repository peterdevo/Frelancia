import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { JobDetail, JobIntroduction } from "../models/JobMarket";
import { Pagination, PagingParams } from "../models/Pagination";

export default class MarketStore {
  jobs: JobIntroduction[] = [];
  jobDetail = {} as JobDetail;
  pagingParams = new PagingParams();
  pagination: Pagination | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
  setLoading(state: boolean) {
    this.loading = state;
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    return params;
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  getJobs = async () => {
    try {
      this.setLoading(true);
      this.jobs = [];
      const response = await agent.market.getJobs(this.axiosParams);
      console.log("response", response);
      runInAction(() => {
        this.jobs = response.data;
      });
      this.setPagination(response.pagination);
      this.setLoading(false);
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
