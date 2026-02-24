import { FC } from 'react';

import {
  FormControlLabel,
  type FormControlLabelProps,
  Switch,
  type SwitchProps,
  type TypographyProps,
} from '@mui/material';

//
//

export type AppSwitchProps = {
  name: string;
  color?: 'primary' | 'error';
  label?: React.ReactNode;
  labelProps?: TypographyProps;
  switchProps?: SwitchProps;
} & Omit<FormControlLabelProps, 'size' | 'control' | 'label'>;

export const AppSwitch: FC<AppSwitchProps> = ({
  name,
  label,
  color = 'primary',
  switchProps,
  labelProps,
  ...props
}) => {
  if (!label) return <Switch name={name} color={color} {...switchProps} />;

  return (
    <FormControlLabel
      label={label}
      control={<Switch name={name} color={color} {...switchProps} />}
      slotProps={{ typography: { ...labelProps } }}
      {...props}
    />
  );
};

//
