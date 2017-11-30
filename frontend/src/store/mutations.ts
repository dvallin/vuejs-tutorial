import {Task, TaskState} from "../domain/Task";

export enum Mutations {
  AddTaskSucceeded = 'addTaskSucceeded',
  TaskStateChanged = 'taskStateChanged',
  FetchTasksSucceeded = 'fetchTasksSucceeded',

  FetchTasksFailed = 'fetchTasksFailed',
  TaskNotFound = 'taskNotFound',
  AddTaskFailed = 'addTaskFailed'
}

export interface AddTaskSucceeded {
  type: Mutations.AddTaskSucceeded;
  task: Task;
}
export interface TaskStateChanged {
  type: Mutations.TaskStateChanged;
  task: Task;
  newTaskState: TaskState;
}
export interface FetchTasksSucceeded {
  type: Mutations.FetchTasksSucceeded;
  tasks: Array<Task>;
}
export interface FetchTasksFailed {
  type: Mutations.FetchTasksFailed;
  error: string;
}
export interface TaskNotFound {
  type: Mutations.TaskNotFound;
  taskTitle: string;
}
export interface AddTaskFailed {
  type: Mutations.AddTaskFailed;
  taskTitle: string;
}

export const mutations = {
  [Mutations.AddTaskSucceeded] (state, payload: AddTaskSucceeded) {
    state.tasks.push(payload.task);
  },
  [Mutations.TaskStateChanged] (state, payload: TaskStateChanged) {
    payload.task.state = payload.newTaskState;
  },
  [Mutations.FetchTasksSucceeded] (state, payload: FetchTasksSucceeded) {
    state.tasks = payload.tasks;
  },
  [Mutations.TaskNotFound] (state, payload: TaskStateChanged) {
    state.errors.push(payload);
  },
  [Mutations.FetchTasksFailed] (state, payload: FetchTasksFailed) {
    state.errors.push(payload);
  },
  [Mutations.AddTaskFailed] (state, payload: AddTaskFailed) {
    state.errors.push(payload);
  }
};
