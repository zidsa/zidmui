import { InputAdornment, InputAdornmentProps, styled } from '@mui/material';

import { AppTypography, AppTypographyProps } from './app-typography';

//
//

export type AppInputAdornmentTextProps = InputAdornmentProps & {
  typographyProps?: AppTypographyProps;
};

export const AppInputAdornmentText = ({
  children,
  typographyProps,
  ...props
}: AppInputAdornmentTextProps) => {
  return (
    <InputAdornment {...props}>
      <StyledAppTypography variant="body1" color="text.secondary" {...typographyProps}>
        {children}
      </StyledAppTypography>
    </InputAdornment>
  );
};

//

const StyledAppTypography = styled(AppTypography)(({ theme }) => ({
  minWidth: theme.spacing(1.25),
}));
