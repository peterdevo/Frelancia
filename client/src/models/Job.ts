import { JobProfile } from "./JobProfile";

export interface Job{
  id: string;
  title: string;
  jobProfile: JobProfile|null;
  jobProfileId: string;
  introduction: string;
  isShared: boolean;
}