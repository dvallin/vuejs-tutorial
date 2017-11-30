import {Mutations} from "../../src/store/mutations";
import {Task, TaskState} from "../../src/domain/Task";
import {getters} from "../../src/store";
import {mutations, Mutations} from "../../src/store/mutations";
import {actions, Actions} from "../../src/store/actions";

import * as TasksApi from "../../src/api/tasks";

describe("store task handling", () => {

  describe("getters", () => {
    it("finds tasks by title", () => {
      const task1 = new Task("id", "task1");
      const state = { tasks: [task1] };
      expect(getters.taskByTitle(state, null)("task1")).toBe(task1);
      expect(getters.taskByTitle(state, null)("task2")).toBeUndefined();
    });
  });

  describe("mutations", () => {
    it("adds tasks", () => {
      const state = { tasks: [] };
      mutations.addTaskSucceeded(state, {
        type: Mutations.AddTaskSucceeded,
        task: new Task("id", "task1")
      });
      expect(state.tasks.length).toBe(1);
    });

    it("adds errors on failed add task", () => {
      const state = { errors: [] };
      mutations.addTaskFailed(state, {
        type: Mutations.AddTaskFailed,
        error: {}
      });
      expect(state.errors.length).toBe(1);
    });

    it("sets tasks state", () => {
      const task = new Task("id", "task 1");
      const newTaskState = TaskState.Done;
      const state = { tasks: [task] };
      mutations.taskStateChanged(state, {
        type: Mutations.TaskStateChanged,
        task,
        newTaskState
      });
      expect(state.tasks[0].state).toBe(TaskState.Done);
    });

    it("fetches tasks", () => {
      const task = new Task("id", "task 1");
      const state = { tasks: [] };
      mutations.fetchTasksSucceeded(state, {
        type: Mutations.FetchTasksSucceeded,
        tasks: [task]
      });
      expect(state.tasks).toEqual([task]);
    });

    it("not found error is tracked", () => {
      const state = { errors: [] };
      mutations.taskNotFound(state, {
        type: Mutations.TaskNotFound,
        task: "task1",
      });
      expect(state.errors.length).toBe(1);
    });

    it("tracks fetch tasks failure", () => {
      const state = { errors: [] };
      mutations.fetchTasksFailed(state, {
        type: Mutations.FetchTasksFailed,
        error: ""
      });
      expect(state.errors.length).toBe(1);
    });
  });

  describe("actions", () => {
    const mockContext = (foundTask: Task) => {
      return {
        getters: {  taskByTitle:(s) => foundTask },
        commit: jest.fn()
      };
    };

    describe("fetch tasks", () => {
      beforeEach(() => {
        TasksApi.fetchTasks = jest.fn();
      });

      it("calls success if api succeeds", async () => {
        const context = mockContext(undefined);
        const tasks = [];
        TasksApi.fetchTasks.mockReturnValueOnce(
          Promise.resolve(tasks)
        );

        await actions.fetchTasks(context, {
          type: Actions.FetchTasks
        });
        expect(context.commit).toHaveBeenCalledWith({
          type: Mutations.FetchTasksSucceeded,
          tasks
        });
      });

      it("calls error handling on error", async () => {
        const context = mockContext(undefined);
        const error = {message: "Server Out of Potatoes Exception"};
        TasksApi.fetchTasks.mockReturnValueOnce(
          Promise.reject(error)
        );
        await actions.fetchTasks(context, {
          type: Actions.FetchTasks
        });
        expect(context.commit).toHaveBeenCalledWith({
          type: Mutations.FetchTasksFailed,
          error: error.message
        });
      });
    });

    describe("add task", () => {
      beforeEach(() => {
        TasksApi.addTask = jest.fn();
      });

      it("adds tasks if they cannot be found", async () => {
        const context = mockContext(undefined);
        const taskTitle = "title";
        const task = new Task("id", taskTitle);
        TasksApi.addTask.mockReturnValueOnce(
          Promise.resolve(task)
        );

        await actions.addTask(context, {
          type: Actions.AddTask,
          title: taskTitle
        });

        expect(context.commit).toHaveBeenCalledWith({
          type:  Mutations.AddTaskSucceeded,
          task
        });
      });

      it("commits failure on failure", async () => {
        const context = mockContext(undefined);
        const title = "title";
        const task = new Task("id", title);
        TasksApi.addTask.mockReturnValueOnce(
          Promise.reject(task)
        );

        await actions.addTask(context, {
          type: Actions.AddTask,
          title
        });

        expect(context.commit).toHaveBeenCalledWith({
          type: Mutations.AddTaskFailed,
          title
        });
      });

      it("does not add tasks if they can be found", () => {
        const taskTitle = "title";
        const context = mockContext(new Task("id", taskTitle));

        actions.addTask(context, {
          type: Actions.AddTask,
          title: taskTitle
        });
        expect(context.commit).toHaveBeenCalledTimes(0);
      });
    });

    describe("set task state", () => {
      it("sets task to done on complete", () => {
        const taskTitle = "title";
        const task = new Task('id', taskTitle);
        const context = mockContext(task);

        actions.setTaskComplete(context, {
          type: Actions.SetTaskComplete,
          title: taskTitle,
          complete: true
        });

        expect(context.commit).toHaveBeenCalledWith({
          type:  Mutations.TaskStateChanged,
          task: new Task('id', taskTitle),
          newTaskState: TaskState.Done
        });
      });

      it("sets task to open on not complete", () => {
        const taskTitle = "title";
        const task = new Task('id', taskTitle);
        const context = mockContext(task);

        actions.setTaskComplete(context, {
          type: Actions.SetTaskComplete,
          title: taskTitle,
          complete: false
        });

        expect(context.commit).toHaveBeenCalledWith({
          type:  Mutations.TaskStateChanged,
          task: new Task('id', taskTitle),
          newTaskState: TaskState.Open
        });
      });

      it("reports error if task cannot be found on access", () => {
        const context = mockContext(undefined);
        const taskTitle = "title";
        actions.setTaskComplete(context, {
          type: Actions.SetTaskComplete,
          title: taskTitle,
          complete: true
        });
        expect(context.commit).toHaveBeenCalledWith({
          type:  Mutations.TaskNotFound,
          title: taskTitle
        });
      });
    });
  });
});
