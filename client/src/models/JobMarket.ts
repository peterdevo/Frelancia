import { JobLink } from "./JobLink";
import { Photo } from "./Photo";

export interface JobIntroduction {
  id: string;
  title: string;
  introduction: string;
}

export interface JobDetail {
  title: string;
  introduction: string;
  firstName: string;
  lastName: string;
  bio: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  userPhoto:string;
  niche: string;
  socialMedia:string;
  language:string;
  jobLinks: JobLink[];
  photos: Photo[];
  description: string;
}
