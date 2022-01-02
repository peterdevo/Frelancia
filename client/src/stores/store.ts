import { createContext, useContext } from "react";
import AccountStore from "./AccountStore";
import { CommonStore } from "./CommonStore";
import JobStore from "./JobStore";
import MarketStore from "./MarketStore";
import ProfileStore from "./ProfileStore";
import UserStore from "./UserStore";

interface Store {
  profileStore: ProfileStore;
  jobStore:JobStore;
  commonStore:CommonStore
  accountStore:AccountStore
  userStore:UserStore
  marketStore:MarketStore
}

export const store: Store = {
  profileStore: new ProfileStore(),
  jobStore:new JobStore(),
  commonStore:new CommonStore(),
  accountStore:new AccountStore(),
  userStore:new UserStore(),
  marketStore:new MarketStore()

};

export const StoreContext=createContext(store);

export function useStore(){
  return useContext(StoreContext)
}