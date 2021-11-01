import { createContext, useContext } from "react";
import { CommonStore } from "./CommonStore";
import JobStore from "./JobStore";
import ProfileStore from "./ProfileStore";

interface Store {
  profileStore: ProfileStore;
  jobStore:JobStore;
  commonStore:CommonStore
}

export const store: Store = {
  profileStore: new ProfileStore(),
  jobStore:new JobStore(),
  commonStore:new CommonStore()

};

export const StoreContext=createContext(store);

export function useStore(){
  return useContext(StoreContext)
}