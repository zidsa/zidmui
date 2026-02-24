import {
  RadioGroupProps,
  FormControlLabelProps,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  styled,
} from '@mui/material';

//
//

// For this component, the control is omitted from the options
// to ensure that developers do not pass different controls.
export interface AppRadioGroupProps extends RadioGroupProps {
  name: string;
  label?: string;
  options: Omit<FormControlLabelProps, 'control'>[];
  disabled?: boolean;
  row?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  radioSize?: 'small' | 'medium' | 'large';
}

export const AppRadioGroup: React.FC<AppRadioGroupProps> = ({
  name,
  label,
  options,
  disabled = false,
  row = true,
  value,
  onChange,
  labelProps,
  radioSize = 'medium',
  sx,
}: AppRadioGroupProps) => {
  return (
    <Box>
      {label && (
        <AppRadioGroupLegend disabled={disabled} component="legend">
          {label}
        </AppRadioGroupLegend>
      )}

      <RadioGroup row={row} name={name} onChange={onChange} sx={sx} value={value}>
        {options.map((option, i) => (
          <AppRadioGroupLabel
            key={i}
            disabled={disabled}
            {...option}
            control={<Radio disableRipple size={radioSize} />}
            {...labelProps}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

//

const AppRadioGroupLabel = styled(FormControlLabel)(({ theme }) => {
  return {
    marginInline: 0,
    gap: theme.spacing(0.5),
  };
});

const AppRadioGroupLegend = styled(FormLabel)<{ component?: string }>(({ theme }) => {
  return {
    fontWeight: theme.typography.subtitle2.fontWeight,
    fontSize: theme.typography.subtitle2.fontSize,
    lineHeight: theme.typography.subtitle2.lineHeight,
    marginBottom: theme.spacing(1.5),
  };
});
