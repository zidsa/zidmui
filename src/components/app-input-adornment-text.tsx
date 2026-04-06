import { InputAdornment, InputAdornmentProps, styled } from '@mui/material';

import { AppTypography, AppTypographyProps } from './app-typography';

//
//

export type AppInputAdornmentTextProps = Omit<InputAdornmentProps, 'position'> & {
  typographyProps?: AppTypographyProps;
  position?: 'start' | 'end';
};

export const AppInputAdornmentText = ({
  children,
  position = 'start',
  typographyProps,
  ...props
}: AppInputAdornmentTextProps) => {
  return (
    <InputAdornment {...props} position={position}>
      <StyledAppTypography variant="body2" color="text.tertiary" {...typographyProps}>
        {children}
      </StyledAppTypography>
    </InputAdornment>
  );
};

//

const StyledAppTypography = styled(AppTypography)(({ theme }) => ({
  minWidth: theme.spacing(1.25),
}));
