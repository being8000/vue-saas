import { VNodeProps, getCurrentInstance } from "vue";

export type RawProps = VNodeProps & {
  __v_isVNode?: never;
  [Symbol.iterator]?: never;
} & Record<string, any>;
export const baseEvents: RawProps = {
  onClick: (e: any) => {
    const instance = getCurrentInstance();
    console.log(123123, instance, e);
  },
};
