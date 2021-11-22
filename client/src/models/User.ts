export interface UserFormValues{
  email:string,
  password:string,
  displayName?:string,
  userName?:string
}

export interface User{
  id:string,
  displayName:string,
  token:string,
  userName:string,
  image:string|null
}