import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export type DebouncedStateReturn<S> = [
  S | undefined,
  React.Dispatch<React.SetStateAction<S | undefined>>,
  S | undefined,
];

export const useDebounceState = <S>(
  initialState?: S | (() => S),
  delay = 400,
): DebouncedStateReturn<S> => {
  const [value, setValue] = useState<S | undefined>(initialState);
  const [debouncedValue] = useDebounce(value, delay);

  return [debouncedValue, setValue, value];
};
