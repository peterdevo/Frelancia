import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/ServerError";

export class CommonStore {
  error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setErrors = (error: ServerError) => {
    this.error = error;
  };
}
