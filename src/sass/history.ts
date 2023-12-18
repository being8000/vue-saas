import { Command } from "./command";

/**
 * 用命令模式存储历史命令
 */
export class CommandHistory {
  private history: Command[] = [];
  push(c: Command) {
    this.history.push(c);
  }

  pop() {
    return this.history.pop();
  }

  executeCommand(c: Command) {
    if (c.execute()) {
      this.history.push(c);
    }
  }
  undo() {
    const c = this.history.pop();
    c?.undo();
  }
}
