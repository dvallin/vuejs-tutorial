import axios from 'axios';
import _ from 'lodash';
import {Task} from "../domain/Task";

const config = {
  baseURL: 'http://localhost:4242'
};

export async function fetchTasks(): Promise<Array<Task>> {
  const { data } = await axios.get('/api/tasks', config);
  return _.map(data, (task) => new Task(task.id, task.title));
}

export async function addTask(title: string): Promise<Task> {
  const { data } = await axios.post('/api/tasks', {title}, config);
  return new Task(data.id, data.title);
}
