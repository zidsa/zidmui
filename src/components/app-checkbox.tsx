import {
  Checkbox,
  type CheckboxProps,
  FormControlLabel,
  type FormControlLabelProps,
  styled,
} from '@mui/material';

//
//

export interface AppCheckboxProps {
  label?: string | React.ReactNode;
  labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: CheckboxProps['onChange'];
  checkboxProps?: Omit<CheckboxProps, 'checked' | 'onChange' | 'name' | 'disabled'>;
}

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  label = '',
  labelProps,
  name = '',
  checked,
  disabled = false,
  onChange = () => {},
  checkboxProps,
}) => {
  return (
    <FormControlLabel
      label={label}
      disabled={disabled}
      control={
        <AppCheckboxStyled
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...checkboxProps}
        />
      }
      {...labelProps}
    />
  );
};

//

const AppCheckboxStyled = styled(Checkbox)(({ theme }) => ({
  paddingInlineStart: 0,
  paddingInlineEnd: theme.spacing(0.5),
  '> svg': {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
}));
