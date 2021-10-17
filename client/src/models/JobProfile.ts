import { JobLink } from "./JobLink";

export interface JobProfile{
  id: string;
  nicheId: number;
  jobLinks: JobLink[];
  photos: string;
  description: string;
  createAt: Date;
}