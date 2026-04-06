import { InputAdornment, InputAdornmentProps, styled } from '@mui/material';

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
  hideBackground,
  sx,
  ...props
}: AppInputAdornmentTextProps) => {
  return (
    <InputAdornment
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
    </InputAdornment>
  );
};

const getHideBackgroundSx = (hide?: boolean) =>
  hide ? { background: 'transparent', border: 'none' } : {};

//

const StyledAppTypography = styled(AppTypography)(({ theme }) => ({
  minWidth: theme.spacing(1.25),
}));
