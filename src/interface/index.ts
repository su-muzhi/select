import type * as React from 'react';
import type { Key, RawValueType } from './generator';

export type RenderDOMFunc = (props: any) => HTMLElement;

export type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);

export type Mode = 'multiple' | 'tags' | 'combobox';

// ======================== Option ========================
export interface FieldNames {
  value?: string;
  label?: string;
  options?: string;
}

export type OnActiveValue = (
  active: RawValueType,
  index: number,
  info?: { source?: 'keyboard' | 'mouse' },
) => void;

export interface BasicOptionCoreData {
  key?: Key;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface OptionCoreData extends BasicOptionCoreData {
  value: Key;
  title?: string;
  label?: React.ReactNode;
  /** @deprecated Only works when use `children` as option data */
  children?: React.ReactNode;
}

export interface OptionData extends OptionCoreData {
  /** Save for customize data */
  [prop: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface OptionGroupData {
  key?: Key;
  label?: React.ReactNode;
  options: OptionData[];
  className?: string;
  style?: React.CSSProperties;

  /** Save for customize data */
  [prop: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type OptionDataType<ValueType extends BasicOptionCoreData = OptionData> =
  ValueType extends (infer T)[] ? T : ValueType;
export type OptionGroupDataType<ValueType extends BasicOptionCoreData = OptionData> = Omit<
  OptionDataType<ValueType>,
  'value'
> & {
  options: OptionDataType<ValueType>[];
};
export type OptionsType<ValueType extends BasicOptionCoreData = OptionData> = (
  | OptionDataType<ValueType>
  | OptionGroupDataType<ValueType>
)[];

export interface FlattenOptionData<ValueType extends BasicOptionCoreData = OptionData> {
  group?: boolean;
  groupOption?: boolean;
  key: string | number;
  data: OptionsType<ValueType>[number];
  label?: React.ReactNode;
  value?: React.Key;
}
