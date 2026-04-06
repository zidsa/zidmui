import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { AppTypography, AppTypographyProps } from './app-typography';

//
//

export type AppInputAdornmentTextProps = Omit<InputAdornmentProps, 'position'> & {
  typographyProps?: AppTypographyProps;
  position?: 'start' | 'end';
  hideBackground?: boolean;
};

export const AppInputAdornmentText = ({
  children,
  position = 'start',
  typographyProps,
  hideBackground = true,
  sx,
  ...props
}: AppInputAdornmentTextProps) => {
  return (
    <StyledInputAdornment
      sx={{
        ...sx,
        ...getHideBackgroundSx(hideBackground),
      }}
      {...props}
      position={position}
    >
      <StyledAppTypography variant="body2" color="text.tertiary" {...typographyProps}>
        {children}
      </StyledAppTypography>
    </StyledInputAdornment>
  );
};

//

const getHideBackgroundSx = (hide?: boolean) =>
  hide ? { background: 'transparent', border: 'none' } : {};

//

const StyledAppTypography = styled(AppTypography)(({ theme }) => ({
  minWidth: theme.spacing(1.25),
}));

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
  minHeight: 'inherit',
  background: theme.palette.background.default,
  padding: `0 ${theme.spacing(1.5)}`,
  border: `0 ${theme.palette._components.input.outlined.enabledBorder} solid`,
  color: theme.palette.text.tertiary,
  fontSize: theme.typography.body2.fontSize,

  '&.MuiInputAdornment-positionEnd': {
    marginRight: '-14px',
    borderRadius: `0 ${theme.spacing(1)} ${theme.spacing(1)} 0`,
    borderLeftWidth: theme.spacing(0.125),
  },

  '&.MuiInputAdornment-positionStart': {
    marginLeft: '-14px',
    borderRadius: `${theme.spacing(1)} 0 0 ${theme.spacing(1)}`,
    borderRightWidth: theme.spacing(0.125),
  },

  '.MuiInputBase-multiline > &': {
    background: 'transparent',
    minHeight: 'unset',
    border: 'none',
    margin: 0,
    padding: 0,
  },
}));
