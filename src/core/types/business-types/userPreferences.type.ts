import { NotificationPreferences } from "./notificationPreferences.type";

export type UserPreferences = {
  readonly theme: 'light' | 'dark';
  readonly notificationPreferences: NotificationPreferences;
};