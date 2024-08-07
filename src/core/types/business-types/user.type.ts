import { UserPreferences } from "./userPreferences.type";

export type User = {
  readonly _id: string;
  readonly email: string;
  readonly password: string;
  readonly name?: string;
  readonly preferences?: UserPreferences;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}