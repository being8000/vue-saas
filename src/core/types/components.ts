import { HtmlHTMLAttributes } from "vue";
enum ComponentsType {
  Container = 0,
  Input = 1,
  Text = 2,
  Button = 3,
}
enum ComponentStatus {
  Focused = 2,
  Selected = 1,
  None = 0,
}
export type Basis = {
  class: HtmlHTMLAttributes;
  $el: HTMLElement;
  type: ComponentsType;
  status: ComponentStatus;
};
