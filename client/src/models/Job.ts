import { JobProfile } from "./JobProfile";

export interface Job{
  id?: string;
  title: string;
  jobProfileId?:string,
  jobProfile?: JobProfile|null;
  introduction: string;
  isShared: boolean;
  isActive: boolean;
}