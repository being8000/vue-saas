type Events = {
  fns: Function[];
  register: (fn: () => void) => void;
  emits: () => void;
};
export const events: Events = {
  fns: [],
  register(fn: () => void) {
    this.fns.push(fn);
  },
  emits() {
    this.fns.forEach((fn) => fn());
    this.fns = [];
  },
};
