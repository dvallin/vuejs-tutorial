import _ from 'lodash';

import {Task, TaskState} from "../domain/Task";
import {Mutations} from "./mutations";

export enum Actions {
  AddTask = 'addTask',
  SetTaskComplete = 'setTaskComplete'
}

export interface AddTask {
  type: Actions.AddTask;
  title: string;
}

export interface SetTaskComplete {
  type: Actions.SetTaskComplete;
  title: string;
  complete: boolean;
}

export const actions = {
  [Actions.AddTask] ({getters, commit}, payload: AddTask) {
    if(_.isNil(getters.taskByTitle(payload.title))) {
      commit({
        type: Mutations.TaskAdded,
        task: new Task(payload.title)
      });
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
