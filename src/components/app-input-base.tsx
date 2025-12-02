import { FC, useCallback, ReactNode } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

import { AppInputAdornmentText, AppInputAdornmentTextProps } from './app-input-adornment-text';

//
//

export type AppInputBaseProps = Omit<TextFieldProps, 'variant'> & {
  transformText?: (text: string) => string;
  noTopMargin?: boolean;
  startAdornment?: React.JSX.Element;
  startAdornmentText?: React.JSX.Element | string;
  startAdornmentTextProps?: AppInputAdornmentTextProps;
  endAdornment?: React.JSX.Element;
  endAdornmentText?: React.JSX.Element | string;
  endAdornmentTextProps?: AppInputAdornmentTextProps;
  labelSuffix?: ReactNode;
};

export const AppInputBase: FC<AppInputBaseProps> = ({
  transformText,
  noTopMargin,
  children,
  startAdornment,
  startAdornmentText,
  startAdornmentTextProps,
  endAdornment,
  endAdornmentText,
  endAdornmentTextProps,
  labelSuffix,
  size = 'medium',
  ...props
}) => {
  if (noTopMargin) {
    if (!props?.sx) props.sx = {};
    props.sx = { ...props.sx, mt: 0 };
  }

  let labelContent = props.label;

  if (props.label && labelSuffix) {
    labelContent = (
      <>
        {props.label} {labelSuffix}
      </>
    );
  }

  props.slotProps = {
    ...props?.slotProps,
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
      ...props.slotProps?.input,

      // FIX: autocomplete inputs gets broken
      // oxlint-disable-next-line @typescript-eslint/no-explicit-any
      ...(props.InputProps as any),
    },
    ...props?.slotProps,
  };

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

  return (
    <TextField size={size} {...props} label={labelContent} onChange={onChange}>
      {children}
    </TextField>
  );
};
