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
export interface CusNumer {
  min?: number;
  max?: number;
  unit?: string;
  width: string;
}
export interface ImageConfig {
  accept?: string; // 请参考官方文旦设置对应值
  multiple?: boolean; // 是否可以多选，默认单文件
}
export type FieldTypeConfigMap = {
  text: string;
  number: number;
  radio: LabelValue[];
  checkbox: LabelValue[];
  color: string;
  slider: Slider;
  image: ImageConfig;
};
export type FieldType = keyof FieldTypeConfigMap;
export interface FormFieldType<K extends FieldType> {
  label: string;
  key: string;
  type: K;
  config?: FieldTypeConfigMap[K];
}
export type PropsFieldType = FormFieldType<FieldType>;
