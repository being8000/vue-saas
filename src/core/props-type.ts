export interface LabelValue {
  label: string;
  value: any;
}

export interface Slider {
  min: number;
  max: number;
  unit?: string;
}

export type FiledTypeMap = {
  text: string;
  number: number;
  radio: LabelValue[];
  checkbox: LabelValue[];
  color: string;
  slider: Slider;
};
export type FieldType = keyof FiledTypeMap;
export interface FormFieldType<K extends FieldType> {
  label: string;
  key: string;
  type: K;
  config: FiledTypeMap[K];
}
export type PropsFieldType = FormFieldType<FieldType>;
