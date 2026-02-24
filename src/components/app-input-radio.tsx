//TODO: Warning: Failed prop type: Invalid prop `fontSize` of value `large` supplied to `RadioButtonIcon`, expected one of ["small","medium"].
// https://github.com/mui/material-ui/issues/40143 - someone already created issue in MUI repo

import {
  RadioGroupProps,
  BoxProps,
  RadioProps,
  FormControlProps,
  Box,
  FormControl,
  RadioGroup,
  Radio,
  FormHelperText,
  FormControlLabel,
  styled,
} from '@mui/material';
import { AppTypographyProps, AppTypography } from './app-typography';

type Option = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export type AppInputRadioProps = RadioGroupProps & {
  name: string;
  options: Option[];
  label?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'error';
  labelPlacement?: 'end' | 'start';
  disabled?: boolean;
  error?: boolean;
  boxProps?: BoxProps;
  radioProps?: RadioProps;
  formControlProps?: FormControlProps;
  labelProps?: AppTypographyProps;
};

export const AppInputRadio = ({
  row,
  name,
  label,
  helperText,
  options = [],
  size = 'medium',
  color = 'primary',
  labelPlacement = 'end',
  boxProps,
  error,
  disabled,
  radioProps,
  formControlProps,
  labelProps,
  ...props
}: AppInputRadioProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" {...boxProps}>
      <FormControl error={error} variant="standard" disabled={disabled} {...formControlProps}>
        {label && (
          <AppTypography variant="body1" {...labelProps}>
            {label}
          </AppTypography>
        )}
        <RadioGroup
          row={row}
          {...props}
          name={name}
          sx={props.sx ? props.sx : row ? { gap: 1.5 } : { gap: 0 }}
        >
          {options.map(option => (
            <AppRadioLabel
              key={option.value}
              value={option.value}
              name={name}
              control={
                <Radio
                  size={size}
                  color={color}
                  {...radioProps}
                  name={name}
                  disabled={option.disabled}
                />
              }
              label={option.label}
              labelPlacement={labelPlacement}
            />
          ))}
        </RadioGroup>
        <StyledFormHelperText error={error} disabled={disabled}>
          {error || helperText}
        </StyledFormHelperText>
      </FormControl>
    </Box>
  );
};

const StyledFormHelperText = styled(FormHelperText)({
  marginTop: 0,
});

const AppRadioLabel = styled(FormControlLabel)(({ theme }) => {
  return {
    marginInline: 0,
    gap: theme.spacing(0.5),
    marginLeft: 0,
    minHeight: 38,
  };
});
