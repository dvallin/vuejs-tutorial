import _ from 'lodash';

import * as TasksApi from "../api/tasks";

import {TaskState} from "../domain/Task";
import {Mutations} from "./mutations";

export enum Actions {
  AddTask = 'addTask',
  FetchTasks = 'fetchTasks',
  SetTaskComplete = 'setTaskComplete',
}

export interface AddTask {
  type: Actions.AddTask;
  title: string;
}

export interface FetchTasks {
  type: Actions.FetchTasks;
}

export interface SetTaskComplete {
  type: Actions.SetTaskComplete;
  title: string;
  complete: boolean;
}

export const actions = {
  async [Actions.AddTask] ({getters, commit}, {title}: AddTask): Promise<void> {
    try {
      const foundTask = getters.taskByTitle(title);
      if(_.isNil(foundTask)) {
        const task = await TasksApi.addTask(title);
        commit({ type: Mutations.AddTaskSucceeded, task });
      }
    } catch(error) {
      commit({type: Mutations.AddTaskFailed, title });
    }
  },
  async [Actions.FetchTasks] ({commit}, payload: FetchTasks): Promise<void> {
    try {
      const tasks = await TasksApi.fetchTasks();
      commit({type: Mutations.FetchTasksSucceeded, tasks});
    } catch(error) {
      commit({ type: Mutations.FetchTasksFailed, error: error.message });
    }
  },
  [Actions.SetTaskComplete] ({getters, commit}, payload: SetTaskComplete) {
    const task = getters.taskByTitle(payload.title);
    if(_.isNil(task)) {
      commit({
        type: Mutations.TaskNotFound,
        title: payload.title
      });
    } else {
      const newTaskState = payload.complete ? TaskState.Done : TaskState.Open;
      commit({
        type: Mutations.TaskStateChanged,
        task,
        newTaskState
      })
    }
  }
};
