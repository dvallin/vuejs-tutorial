
import {Task, TaskState} from "../domain/Task";

export enum Mutations {
  TaskAdded = 'taskAdded',
  TaskStateChanged = 'taskStateChanged',
  TaskNotFound = 'taskNotFound'
}

export interface TaskAdded {
  type: Mutations.TaskAdded;
  task: Task;
}
export interface TaskStateChanged {
  type: Mutations.TaskStateChanged;
  task: Task;
  newTaskState: TaskState;
}
export interface TaskNotFound {
  type: Mutations.TaskNotFound;
  taskTitle: string;
}

export const mutations = {
  [Mutations.TaskAdded] (state, payload: TaskAdded) {
    state.tasks.push(payload.task);
  },
  [Mutations.TaskStateChanged] (state, payload: TaskStateChanged) {
    payload.task.state = payload.newTaskState;
  },
  [Mutations.TaskNotFound] (state, payload: TaskStateChanged) {
    state.errors.push(payload);
  }
};
