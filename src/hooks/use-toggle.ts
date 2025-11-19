import { useCallback, useState } from 'react';

//
//

export type UseToggleType = ReturnType<typeof useToggle>;

export const useToggle = (defaultValue: boolean = false) => {
  const [value, setValue] = useState(defaultValue);

  const _setValue = useCallback((val: boolean) => setValue(val), []);

  return {
    value,
    toggle: () => setValue(v => !v),
    on: () => setValue(true),
    off: () => setValue(false),
    setValue: _setValue,
    preventEventDefault: (event?: React.SyntheticEvent) => event?.preventDefault?.(),
  };
};
