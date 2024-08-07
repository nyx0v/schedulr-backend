import {model, Schema} from 'mongoose';
import { Task } from '../types/business-types/task.type';


const taskModel = new Schema<Task>({
  title: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  notes: { type: String },
  category: { type: String, required: true, default: 'uncategorized' },
  priority: { type: Number, required: true, default: 5 },
  timeEstimated: { type: Number },
  deadline: { type: Date },
  reminder: { type: Date },
  parentTaskId: { type: String, ref: 'Task' },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  progress: { type: Number, default: 0 },
}, {timestamps: true});


export const TaskModel = model<Task>('Task', taskModel);

