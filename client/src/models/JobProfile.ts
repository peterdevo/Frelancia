import { JobLink } from "./JobLink";
import { Photo } from "./Photo";

export interface JobProfile{
  id: string;
  profileName:string,
  nicheId: number;
  jobLinks: JobLink[];
  userId:string,
  photos: Photo[];
  description: string;
  createAt?: Date;
}