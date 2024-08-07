import { UserPreferences } from "./userPreferences.type";

export type User = {
  _id: string;
  email: string;
  password: string;
  name?: string;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}