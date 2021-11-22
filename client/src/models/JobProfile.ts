import { JobLink } from "./JobLink";

export interface JobProfile{
  id: string;
  profileName:string,
  nicheId: number;
  jobLinks: JobLink[];
  userId:string,
  photos: string;
  description: string;
  createAt?: Date;
}