type BindingEvents = Record<string, () => void>;

const events: BindingEvents = {
  register() {},
  scale() {},
};
type ToolBox<T> = {
  setUp: (events: T) => void;
};
export const toolBox: ToolBox<T> = {
  setUp(events: T) {},
};
