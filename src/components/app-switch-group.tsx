import { AppSwitch, AppSwitchProps } from './app-switch';
import {
  FormControlProps,
  FormControl,
  FormLabel,
  FormGroup,
  Box,
  FormHelperText,
} from '@mui/material';

export type AppSwitchGroupProps = {
  options: AppSwitchProps[];
  label?: React.ReactNode;
  helperText?: string;
  color?: 'primary' | 'error';
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  formControlProps?: FormControlProps;
};

export const AppSwitchGroup = ({
  options,
  label,
  helperText,
  required,
  color = 'primary',
  disabled,
  error,
  formControlProps,
}: AppSwitchGroupProps) => {
  const hasError = error;

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      error={error}
      disabled={disabled}
      {...formControlProps}
    >
      {label && (
        <FormLabel color="primary" sx={{ mb: 1 }}>
          {label}
        </FormLabel>
      )}
      <FormGroup>
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
          {options.map(option => (
            <AppSwitch required={required} key={option.name} color={color} {...option} />
          ))}
        </Box>
      </FormGroup>
      {(helperText?.length || !!error) && (
        <FormHelperText error={hasError}>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
