import { Nullable } from "primevue/ts-helpers";

/**
 * 该类定义了Props属性面板用到的一些基础类型
 */
export enum FieldTypeEnum {
  Text = "Text",
  Number = "Number",
  Url = "Url",
  Email = "Email",
  Checkbox = "Checkbox",
  Radio = "Radio",
  Select = "Select",
  Textarea = "Textarea",
}

interface Items<T> {
  label: string;
  value: T;
}
export type FieldType = keyof typeof FieldTypeEnum;

export interface Field {
  label: string; // 字段标签
  defaultValue: any; // 默认值
  fieldType: FieldTypeEnum; // 字段类型
  key: string; // 字段key值，用于保存到组件得Prop值上
  items: Items<Field["defaultValue"]>[];
}
export type PropsForm = {};
