import { FC, useCallback, ReactNode } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

import { AppInputAdornmentText, AppInputAdornmentTextProps } from './app-input-adornment-text';

//
//

export type AppInputBaseProps = Omit<TextFieldProps, 'variant'> & {
  transformText?: (text: string) => string;
  startAdornment?: React.JSX.Element;
  startAdornmentText?: React.JSX.Element | string;
  startAdornmentTextProps?: AppInputAdornmentTextProps;
  endAdornment?: React.JSX.Element;
  endAdornmentText?: React.JSX.Element | string;
  endAdornmentTextProps?: AppInputAdornmentTextProps;
  labelSuffix?: ReactNode;
  disableWheelNumberChange?: boolean;
};

export const AppInputBase: FC<AppInputBaseProps> = ({
  transformText,
  children,
  startAdornment,
  startAdornmentText,
  startAdornmentTextProps,
  endAdornment,
  endAdornmentText,
  endAdornmentTextProps,
  labelSuffix,
  disableWheelNumberChange = true,
  size = 'medium',
  slotProps,
  ...props
}) => {
  let labelContent = props.label;

  if (props.label && labelSuffix) {
    labelContent = (
      <>
        {props.label} {labelSuffix}
      </>
    );
  }

  const handleChangeText = useCallback(
    (text: string) => {
      return transformText ? transformText(text) : text;
    },
    [transformText],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = handleChangeText(event.target.value);
      props?.onChange?.(event);
    },
    [handleChangeText, props],
  );

  const inputSlotProps = typeof slotProps?.input === 'function' ? {} : slotProps?.input || {};

  // Prevent scroll wheel from changing number input values
  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (disableWheelNumberChange && props.type === 'number') {
      event.currentTarget.blur();
    }
  };

  if (typeof slotProps?.htmlInput !== 'function' && slotProps?.htmlInput) {
    slotProps.htmlInput.onWheel = handleWheel;
  }

  return (
    <TextField
      size={size}
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : startAdornmentText ? (
            <AppInputAdornmentText position="start" {...startAdornmentTextProps}>
              {startAdornmentText}
            </AppInputAdornmentText>
          ) : undefined,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : endAdornmentText ? (
            <AppInputAdornmentText position="end" {...endAdornmentTextProps}>
              {endAdornmentText}
            </AppInputAdornmentText>
          ) : undefined,
          ...inputSlotProps,

          // FIX: autocomplete inputs gets broken
          // oxlint-disable-next-line @typescript-eslint/no-explicit-any
          ...(props.InputProps as any),
        },
      }}
      {...props}
      label={labelContent}
      onChange={onChange}
    >
      {children}
    </TextField>
  );
};
