import { createContext, useContext } from "react";
import AccountStore from "./AccountStore";
import { CommonStore } from "./CommonStore";
import JobStore from "./JobStore";
import ProfileStore from "./ProfileStore";

interface Store {
  profileStore: ProfileStore;
  jobStore:JobStore;
  commonStore:CommonStore
  accountStore:AccountStore
}

export const store: Store = {
  profileStore: new ProfileStore(),
  jobStore:new JobStore(),
  commonStore:new CommonStore(),
  accountStore:new AccountStore()

};

export const StoreContext=createContext(store);

export function useStore(){
  return useContext(StoreContext)
}