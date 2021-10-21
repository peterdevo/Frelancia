import { createContext, useContext } from "react";
import ProfileStore from "./ProfileStore";

interface Store {
  profileStore: ProfileStore;
}

export const store: Store = {
  profileStore: new ProfileStore(),
};

export const StoreContext=createContext(store);

export function useStore(){
  return useContext(StoreContext)
}