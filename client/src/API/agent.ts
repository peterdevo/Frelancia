import axios, { AxiosResponse } from "axios";
import { Job } from "../models/Job";
import { JobProfile } from "../models/JobProfile";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000";


axios.interceptors.response.use((response) => {
 return sleep(1000).then(() => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
});
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const profileMangements = {
  list: () => request.get<JobProfile[]>("/profile"),
  create:(jobProfile:JobProfile)=>request.post("/profile",jobProfile)
};


const JobMangements={
  list:()=>request.get<Job[]>("/job"),
  create:(job:Job)=>request.post("/job",job)
}
const agent = {
  profileMangements,
  JobMangements
};

export default agent;
