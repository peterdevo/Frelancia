import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Job } from "../models/Job";
import { JobProfile } from "../models/JobProfile";
import { history } from "../index";
import { store } from "../stores/store";
import { UpdatedUser, User, UserFormValues } from "../models/User";
import { Niche } from "../models/Niche";
import { toJS } from "mobx";
import { Photo } from "../models/Photo";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error) => {
    const { data, status, config } = error.response;

    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
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
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const profileMangements = {
  list: () => request.get<JobProfile[]>("profile"),
  create: (jobProfile: JobProfile, files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("Files", file);
    });
    formData.append("jobProfile.nicheId", jobProfile.nicheId.toString());
    formData.append("jobProfile.profileName", jobProfile.profileName);
    formData.append("jobProfile.description", jobProfile.description);
    jobProfile.jobLinks.forEach((jl, index) => {
      formData.append(`jobProfile.jobLinks[${index}].url`, jl.url);
    });

    return axios.post("profile", formData);
  },
  edit: (jobProfile: JobProfile) => {
    return request.put(`profile/${jobProfile.id}`, jobProfile);
  },

  delete: (jobProfileId: string) => {
    return request.delete(`profile/${jobProfileId}`);
  },

  addJobProfilePhoto: (jobProfileId: string, file: File) => {
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("jobProfileId", jobProfileId);
    console.log(jobProfileId);
    return axios
      .post<Photo>("profile/addjobprofilephoto", formdata)
      .then(responseBody);
  },
  listNiche: () => request.get<Niche[]>("/profile/niche"),
  deleteJobProfilePhoto: (jobProfileId: string, deletedId: string) => {
    var formData = new FormData();
    formData.append("deletedId", deletedId);
    formData.append("jobProfileId", jobProfileId);
    return axios.put("/profile/updatephoto", formData);
  },
};

const jobMangements = {
  list: () => request.get<Job[]>("job"),
  create: (job: Job) => request.post("job", job),
  edit: (job: Job) => request.put(`job/${job.id}`, job),
  delete: (id: string) => request.delete(`job/${id}`),
};

const account = {
  login: (userValue: UserFormValues) =>
    request.post<User>("account/login", userValue),
  register: (userValue: UserFormValues) =>
    request.post<User>("account/register", userValue),
  getUser: () => request.get<User>("account"),
};

const user = {
  getUpdatedUser: () => request.get<UpdatedUser>("user"),
  editUser: (updatedUser: UpdatedUser) => request.put("user", updatedUser),
  editImage: (file: File, PhotoId: string, deletedPublicId: string) => {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("id", PhotoId);
    formData.append("deletedPublicId", deletedPublicId);
    return axios.put("user/edituserphoto", formData);
  },
};
const agent = {
  profileMangements,
  jobMangements,
  account,
  user,
};

export default agent;
