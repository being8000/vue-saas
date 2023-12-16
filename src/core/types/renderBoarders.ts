import { Nullable } from "primevue/ts-helpers";
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
type Border = {
  left: HTMLElement;
  right: HTMLElement;
  top: HTMLElement;
  bottom: HTMLElement;
};

function setStyle(
  element: HTMLElement,
  attrs: Partial<CSSStyleDeclaration>
): void {
  if (attrs !== undefined) {
    Object.assign(element.style, attrs);
  }
}
abstract class Drawer {
  border: Nullable<Border>;
  rect: Nullable<DOMRect>;
  borderWidth: number = 1;
  backgroundColor: string = "blue";
  public abstract getPeakElement(): HTMLElement | undefined;
  paint() {
    this.clear();
    const dom = this.getPeakElement();
    this.rect = dom?.getBoundingClientRect();
    this.border = {
      left: this.drawLeft(),
      right: this.drawRight(),
      top: this.drawTop(),
      bottom: this.drawBottom(),
    };
    const fragment = document.createDocumentFragment();
    fragment.append(...Object.values(this.border));
    document.body.append(fragment);
  }
  debouncePaint() {
    return debounce(this.paint, 100);
  }
  clear() {
    this.border?.left.remove();
    this.border?.right.remove();
    this.border?.top.remove();
    this.border?.bottom.remove();
    this.border = null;
  }
  drawLeft(): HTMLElement {
    const left = document.createElement("div");
    setStyle(left, {
      pointerEvents: "none",
      zIndex: "9999",
      position: "fixed",
      left: `${this.rect?.left}px`,
      top: `${this.rect?.top}px`,
      width: `${this.borderWidth}px`,
      height: `${this.rect?.height}px`,
      background: this.backgroundColor,
    });
    return left;
  }
  drawRight(): HTMLElement {
    const right = document.createElement("div");
    setStyle(right, {
      pointerEvents: "none",
      zIndex: "9999",
      position: "fixed",
      left: `${(this.rect?.right || 0) - this.borderWidth || 0}px`,
      top: `${this.rect?.top}px`,
      width: `${this.borderWidth}px`,
      height: `${this.rect?.height}px`,
      background: this.backgroundColor,
    });
    return right;
  }
  drawTop(): HTMLElement {
    const top = document.createElement("div");
    setStyle(top, {
      pointerEvents: "none",
      zIndex: "9999",
      position: "fixed",
      left: `${this.rect?.left}px`,
      top: `${(this.rect?.top || 0) - this.borderWidth}px`,
      width: `${this.rect?.width}px`,
      height: `${this.borderWidth}px`,
      background: this.backgroundColor,
    });
    return top;
  }
  drawBottom(): HTMLElement {
    const bottom = document.createElement("div");
    setStyle(bottom, {
      pointerEvents: "none",
      zIndex: "9999",
      position: "fixed",
      left: `${this.rect?.left}px`,
      top: `${this.rect?.bottom}px`,
      width: `${this.rect?.width}px`,
      height: `${this.borderWidth}px`,
      background: this.backgroundColor,
    });
    return bottom;
  }
}
type Element = {
  el?: HTMLElement;
  id: Symbol;
  level: number;
  isLast: boolean;
};
class DrawBorder extends Drawer {
  dom?: HTMLElement;
  queues: Element[] = [];
  constructor() {
    super();
  }
  public getPeakElement(): HTMLElement | undefined {
    return this.queues[this.queues.length - 1]?.el;
  }
  push(el: Element) {
    this.queues = this.queues.filter((e) => e.id != el.id);
    this.queues.push(el);
    this.paint();
  }
  pop() {
    this.queues.pop();
    this.paint();
  }
  reset() {
    this.queues = [];
    this.clear();
  }
  eventInitial() {}
}
export const drawer = new DrawBorder();
