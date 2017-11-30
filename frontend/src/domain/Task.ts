export enum TaskState {
  Open,
  Done
}

export class Task {
  id: string;
  title: string;
  state: TaskState;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
    this.state = TaskState.Open;
  }
}
