import * as React from 'react';
import type { RawValueType, FlattenOptionsType } from '../interface/generator';

export default function useCacheOptions<RawOptionData>(options: FlattenOptionsType<RawOptionData>) {
  const prevOptionMapRef =
    React.useRef<Map<RawValueType, FlattenOptionsType<RawOptionData>[number]>>(null);

  const optionMap = React.useMemo(() => {
    const map: Map<RawValueType, FlattenOptionsType<RawOptionData>[number]> = new Map();
    options.forEach((item) => {
      const { value } = item;
      map.set(value, item);
    });
    return map;
  }, [options]);

  prevOptionMapRef.current = optionMap;

  const getValueOption = (valueList: RawValueType[]): FlattenOptionsType<RawOptionData> =>
    valueList.map((value) => prevOptionMapRef.current.get(value)).filter(Boolean);

  return getValueOption;
}
