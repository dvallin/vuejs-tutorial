import {Mutations} from "../../src/store/mutations";
import {Task, TaskState} from "../../src/domain/Task";
import {getters} from "../../src/store";
import {mutations, Mutations} from "../../src/store/mutations";
import {actions, Actions} from "../../src/store/actions";


describe("store task handling", () => {

  describe("getters", () => {
    it("finds tasks by title", () => {
      const task1 = new Task("task1");
      const state = { tasks: [task1] };
      expect(getters.taskByTitle(state, getters)("task1")).toBe(task1);
      expect(getters.taskByTitle(state, getters)("task2")).toBeUndefined();
    })
  });

  describe("mutations", () => {
    it("adds tasks", () => {
      const state = { tasks: [] };
      mutations.taskAdded(state, {
        type: Mutations.TaskAdded,
        task: new Task("task1")
      });
      expect(state.tasks.length).toBe(1);
    });

    it("sets tasks state", () => {
      const task = new Task("task 1");
      const newTaskState = TaskState.Done;
      const state = { tasks: [task] };
      mutations.taskStateChanged(state, {
        type: Mutations.TaskStateChanged,
        task,
        newTaskState
      });
      expect(state.tasks[0].state).toBe(TaskState.Done);
    });

    it("not found error is tracked", () => {
      const state = { errors: [] };
      mutations.taskNotFound(state, {
        type: Mutations.TaskNotFound,
        task: "task1",
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

    it("adds tasks if they cannot be found", () => {
      const context = mockContext(undefined);
      const taskTitle = "title";

      actions.addTask(context, {
        type: Actions.AddTask,
        title: taskTitle
      });

      expect(context.commit).toHaveBeenCalledWith({
        type:  Mutations.TaskAdded,
        task: new Task(taskTitle)
      });
    });

    it("does not add tasks if they can be found", () => {
      const taskTitle = "title";
      const context = mockContext(new Task(taskTitle));

      actions.addTask(context, {
        type: Actions.AddTask,
        title: taskTitle
      });
      expect(context.commit).toHaveBeenCalledTimes(0);
    });

    it("sets task to done on complete", () => {
      const taskTitle = "title";
      const task = new Task(taskTitle);
      const context = mockContext(task);

      actions.setTaskComplete(context, {
        type: Actions.SetTaskComplete,
        title: taskTitle,
        complete: true
      });

      expect(context.commit).toHaveBeenCalledWith({
        type:  Mutations.TaskStateChanged,
        task: new Task(taskTitle),
        newTaskState: TaskState.Done
      });
    });

    it("sets task to open on not complete", () => {
      const taskTitle = "title";
      const task = new Task(taskTitle);
      const context = mockContext(task);

      actions.setTaskComplete(context, {
        type: Actions.SetTaskComplete,
        title: taskTitle,
        complete: false
      });

      expect(context.commit).toHaveBeenCalledWith({
        type:  Mutations.TaskStateChanged,
        task: new Task(taskTitle),
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
