import { Command } from "./Command";

export class CommandHistory {
  private history: Command[] = [];
  push(c: Command) {
    this.history.push(c);
  }

  pop() {
    return this.history.pop();
  }

  executeCommand(c: Command) {
    console.log("execute", c);
    if (c.execute()) {
      this.history.push(c);
    }
  }
  undo() {
    const c = this.history.pop();
    c?.undo();
    console.log("undo", c);
  }
}
