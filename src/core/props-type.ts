export interface LabelValue {
  label: string;
  value: any;
}

export interface Slider {
  min: number;
  max: number;
  unit?: string;
  step?: number;
}
export interface ImageConfig {
  accept?: string; // 请参考官方文旦设置对应值
  multiple?: boolean; // 是否可以多选，默认单文件
}
export type FiledTypeMap = {
  text: string;
  number: number;
  radio: LabelValue[];
  checkbox: LabelValue[];
  color: string;
  slider: Slider;
  image: ImageConfig;
};
export type FieldType = keyof FiledTypeMap;
export interface FormFieldType<K extends FieldType> {
  label: string;
  key: string;
  type: K;
  config?: FiledTypeMap[K];
}
export type PropsFieldType = FormFieldType<FieldType>;
