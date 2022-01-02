import { PhotoDto } from "./UserPhoto";

export interface UserFormValues {
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  token: string;
  userName: string;
  userPhoto: string;
}

export interface UpdatedUser {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  language: string;
  socialMedia: string;
  photoDto: PhotoDto;
}
