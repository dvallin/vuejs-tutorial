import * as Vuex from 'vuex';
import Vue from 'vue';

import {mutations} from './mutations';
import {actions} from "./actions";

import {Task} from "@/domain/Task";

export const initialState = () => {
  return {
    tasks: [new Task("new task"), new Task("old task")],
    errors: []
  }
};

export const getters = {
  taskByTitle: (state, getters) => (title) => {
    return state.tasks.find(task => task.title === title)
  }
};

Vue.use(Vuex);
export default new Vuex.Store({
  state: initialState(),
  getters,
  mutations,
  actions
});
