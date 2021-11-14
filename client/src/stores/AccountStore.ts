import { makeAutoObservable, runInAction, toJS } from "mobx";
import agent from "../API/agent";
import { User, UserFormValues } from "../models/User";
import { store } from "./store";
import { history } from "../index";

export default class AccountStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (userValue: UserFormValues) => {
    try {
      const user = await agent.account.login(userValue);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      history.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  register = async (userValue: UserFormValues) => {
    try {
     await agent.account.register(userValue);
    } catch (error) {
      throw error;
    }
  };

  logOut = () => {
    store.commonStore.setToken("");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.account.getUser();
      this.user = user;
    } catch (error) {
      throw error;
    }
  };
}
