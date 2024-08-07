import {model, Schema} from 'mongoose';

import {User} from '../types/business-types/user.type';

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  preferences: {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
  },
}, {timestamps: true});


export const UserModel = model<User>('User', userSchema);

