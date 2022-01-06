import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../API/agent";
import { UpdatedUser } from "../models/User";
import {toast} from "react-toastify";


export default class UserStore {
  updatedUser: UpdatedUser = {
    id: "",
    firstName: "",
    lastName: "",
    bio: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    socialMedia:"",
    language:"",
    photoDto: {
      id: "",
      publicId: "",
      url: "",
    },
  };
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  getUpdatedUser = async () => {
    try {
      const user = await agent.user.getUpdatedUser();
      const obj = {
        id: "",
        firstName: "",
        lastName: "",
        bio: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        language:"",
        socialMedia:"",
        photoDto: {
          id: "",
          publicId: "",
          url: "",
        },
      };
      runInAction(() => {
        for (const key in user) {
          if (user[key] === null) {
            obj[key] = "";
          } else {
            obj[key] = user[key];
          }
        }
        this.updatedUser = obj;
      });
      

    } catch (error) {
      console.log(error);
    }
  };

  editUser = async (updatedUser: UpdatedUser) => {
    try {
      this.setLoading(true);
      await agent.user.editUser(updatedUser);
      this.updatedUser = updatedUser;
      toast.success("User has successfully updated.")
      this.setLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  };

  editImage = async (file: File, photoId: string) => {
    try {
      this.setLoading(true);
      await agent.user.editImage(file, photoId);
      this.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  setPreview=(preview:string)=>{
      this.updatedUser.photoDto.url=preview;
  }

  setLoading = (state: boolean) => {
    this.isLoading = state;
  };
}
