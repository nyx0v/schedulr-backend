
export interface Task {
  id: string;
  userId: string;
  title: string;
  notes?: string;
  category: string;
  priority: number; // 1 to 10
  timeEstimated: number; //in seconds
  deadline?: Date;
  reminder?: Date;
  parentTaskId?: string;
  subtasks?: Task[];
  progress: number; //percent with steps of 12.5% not enforced by backend
  createdAt: Date;
  updatedAt: Date;
}