export enum TaskState {
  Open,
  Done
}

export class Task {
  title: string;
  state: TaskState;

  constructor(title: string) {
    this.title = title;
    this.state = TaskState.Open;
  }
}
