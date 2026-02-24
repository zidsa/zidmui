import React from 'react';
import {
  FormControlLabelProps,
  StackProps,
  RadioProps,
  FormControlLabel,
  Radio,
  CircularProgress,
  styled,
} from '@mui/material';
import { AppTypographyProps, AppTypography } from './app-typography';
import { StackColumn } from './stack-column';
import { StackRow } from './stack-row';

//
//

export type AppInputRadioCardProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label: string | React.ReactNode;
  labelProps?: AppTypographyProps;
  labelContainerProps?: StackProps;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  radioProps?: RadioProps;
  isLoading?: boolean;
  labelSuffix?: React.ReactNode;
  icon?: React.ReactNode;
};

export const AppInputRadioCard: React.FC<AppInputRadioCardProps> = ({
  label,
  labelProps,
  labelContainerProps,
  description,
  descriptionProps,
  radioProps,
  isLoading,
  labelSuffix,
  icon,
  ...props
}) => {
  return (
    <FormControlLabelStyled
      {...props}
      control={<RadioStyled {...radioProps} />}
      label={
        <StackRow justifyContent="space-between" alignItems="center">
          <StackColumn gap={0} overflow="hidden" {...labelContainerProps}>
            {isLoading && <CircularProgressStyled />}

            {typeof label === 'string' ? (
              <StackRow width="100%" justifyContent="space-between">
                <AppTypography variant="body2" {...labelProps}>
                  {label}
                </AppTypography>
                {labelSuffix ? labelSuffix : null}
              </StackRow>
            ) : (
              label
            )}
            {description && (
              <RadioDescriptionStyled variant="caption" color="text.tertiary" {...descriptionProps}>
                {description}
              </RadioDescriptionStyled>
            )}
          </StackColumn>

          {icon}
        </StackRow>
      }
    />
  );
};

//

const FormControlLabelStyled = styled(FormControlLabel)(({ theme }) => {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(0.5),
    margin: 0,
    padding: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.colors.neutral[100]}`,
    borderRadius: theme.shape.standardBorderRadius,
    ':has(:checked)': {
      backgroundColor: theme.palette.colors.primary[50],
      borderColor: '#AE72FF80',
    },
    overflow: 'hidden',
    '> .MuiFormControlLabel-label': {
      overflow: 'hidden',
    },
    '& .MuiFormControlLabel-label': {
      width: '100%',
    },
  };
});

const RadioStyled = styled(Radio)(({ theme }) => {
  return {
    width: theme.spacing(2.5),
    minWidth: theme.spacing(2.5),
    height: theme.spacing(2.5),
    padding: 0,
  };
});

const RadioDescriptionStyled = styled(AppTypography)(() => {
  return {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
});

const CircularProgressStyled = styled(CircularProgress)(() => {
  return {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)',
  };
});
