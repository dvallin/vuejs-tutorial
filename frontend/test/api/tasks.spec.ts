import * as TasksApi from "../../src/api/tasks";
import axios from 'axios';
import {Task} from "../../src/domain/Task";

describe("tasks api", () => {
  beforeEach(() => {
    axios.get = jest.fn();
    axios.post = jest.fn();
  });

  describe("fetch tasks", () => {
    it("maps fetched tasks into response", async () => {
      const rawTask = {id: "some id", moreData: "garble garble", title: "title"};
      const tasks = [rawTask];
      axios.get.mockReturnValueOnce(Promise.resolve({data: tasks}));

      const tasks = await TasksApi.fetchTasks();
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toBeInstanceOf(Task);
      expect(tasks[0]).toEqual(new Task(rawTask.id, rawTask.title));
    });

    it("hands errors down",  () => {
      const error = {};
      axios.get.mockReturnValueOnce(Promise.reject(error));
      return expect(TasksApi.fetchTasks()).rejects.toEqual(error);
    });
  });

  describe("add task", () => {
    it("maps added task into reponse", async () => {
      const title = "task";
      const task = new Task("id", title);
      axios.post.mockReturnValueOnce(Promise.resolve({data: task}));

      const addedTask = await TasksApi.addTask(title);
      expect(addedTask).toBeInstanceOf(Task);
      expect(addedTask).toEqual(task);
      expect(axios.post.mock.calls[0][1]).toEqual({title});
    });

    it("hands error down", () => {
      const error = {};
      axios.post.mockReturnValueOnce(Promise.reject(error));
      return expect(TasksApi.addTask("task")).rejects.toEqual(error);
    });
  });
});
