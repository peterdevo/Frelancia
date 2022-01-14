import { JobFile } from "./JobFile";
import { JobLink } from "./JobLink";
import { Photo } from "./Photo";

export interface JobProfile{
  id: string;
  profileName:string,
  nicheId: number;
  jobLinks: JobLink[];
  jobFiles:JobFile[];
  userId:string,
  photos: Photo[];
  description: string;
  createAt?: Date;
}