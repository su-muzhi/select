import type { BasicOptionCoreData, OptionType } from '.';
import type { SelectProps, RefSelectProps } from '../generate';

export type SelectSource = 'option' | 'selection' | 'input';

export const INTERNAL_PROPS_MARK = 'RC_SELECT_INTERNAL_PROPS_MARK';

// =================================== Shared Type ===================================
export type Key = string | number;

export type RawValueType = string | number;

export interface LabelValueType {
  key?: Key;
  value?: RawValueType;
  label?: React.ReactNode;
  isCacheable?: boolean;
}
export type DefaultValueType = RawValueType | RawValueType[] | LabelValueType | LabelValueType[];

export interface DisplayLabelValueType extends LabelValueType {
  disabled?: boolean;
}

export type SingleType<MixType> = MixType extends (infer Single)[] ? Single : MixType;

export type OnClear = () => void;

export type CustomTagProps = {
  label: React.ReactNode;
  value: DefaultValueType;
  disabled: boolean;
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  closable: boolean;
};

// ==================================== Generator ====================================
export type GetLabeledValue<ValueType extends BasicOptionCoreData> = (
  value: RawValueType,
  config: {
    options: FlattenOptionsType<ValueType>;
    prevValueMap: Map<RawValueType, LabelValueType>;
    labelInValue: boolean;
    optionLabelProp: string;
  },
) => LabelValueType;

export type FilterOptions<OptionsType extends object[]> = (
  searchValue: string,
  options: OptionsType,
  /** Component props, since Select & TreeSelect use different prop name, use any here */
  config: {
    optionFilterProp: string;
    filterOption: boolean | FilterFunc<OptionsType[number]>;
  },
) => OptionsType;

export type FilterFunc<ValueType extends BasicOptionCoreData> = (
  inputValue: string,
  option?: OptionType<ValueType>,
) => boolean;

export declare function RefSelectFunc<ValueType>(
  Component: React.RefForwardingComponent<RefSelectProps, SelectProps<ValueType>>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<SelectProps<ValueType>> & React.RefAttributes<RefSelectProps>
>;

export type FlattenOptionsType<RawOptionData extends BasicOptionCoreData> = {
  key: Key;
  data: OptionType<RawOptionData>;
  label?: React.ReactNode;
  value?: RawValueType;
  /** Used for customize data */
  [name: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}[];
