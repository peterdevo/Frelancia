import { createContext, useContext } from "react";
import JobStore from "./JobStore";
import ProfileStore from "./ProfileStore";

interface Store {
  profileStore: ProfileStore;
  jobStore:JobStore
}

export const store: Store = {
  profileStore: new ProfileStore(),
  jobStore:new JobStore()
};

export const StoreContext=createContext(store);

export function useStore(){
  return useContext(StoreContext)
}