export type TUser = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
};

export type TUserRegister = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
