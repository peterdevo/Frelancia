import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Job } from "../models/Job";
import { JobProfile } from "../models/JobProfile";
import { history } from "../index";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error) => {
    const { data, status, config } = error.response!;

    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
       
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setErrors(data);
        history.push("/server-error");
        break;
    }

    return Promise.reject(error);
  }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const profileMangements = {
  list: () => request.get<JobProfile[]>("/profile"),
  create: (jobProfile: JobProfile) => request.post("/profile", jobProfile),
  edit: (jobProfile: JobProfile) =>
    request.put(`profile/${jobProfile.id}`, jobProfile),
};

const jobMangements = {
  list: () => request.get<Job[]>("/job"),
  create: (job: Job) => request.post("/job", job),
  edit: (job: Job) => request.put(`/job/${job.id}`, job),
  delete: (id: string) => request.delete(`/job/${id}`),
};
const agent = {
  profileMangements,
  jobMangements,
};

export default agent;
