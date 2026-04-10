import { Box, BoxProps, alpha, styled } from '@mui/material';

//
//

export type AppIconBoxbackgroundColor =
  | 'default'
  | 'primary'
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'secondary';

export type AppIconBoxProps = Omit<BoxProps, 'color'> & {
  children: React.ReactNode;
  background?: AppIconBoxbackgroundColor;
};

export const AppIconBox: React.FC<AppIconBoxProps> = ({
  children,
  background = 'default',
  ...props
}) => {
  return (
    <IconWrapper data-background-color={background} {...props}>
      {children}
    </IconWrapper>
  );
};

//

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.action.selected,
  flexShrink: 0,

  "&[data-background-color='default']": {
    backgroundColor: theme.palette.action.hover,
  },
  "&[data-background-color='primary']": {
    backgroundColor: theme.palette.colors.primary[100],
  },
  "&[data-background-color='blue']": {
    backgroundColor: theme.palette.colors.blue[100],
  },
  "&[data-background-color='red']": {
    backgroundColor: theme.palette.colors.red[100],
  },
  "&[data-background-color='green']": {
    backgroundColor: theme.palette.colors.green[100],
  },
  "&[data-background-color='yellow']": {
    backgroundColor: theme.palette.colors.yellow[100],
  },
  "&[data-background-color='orange']": {
    backgroundColor: theme.palette.colors.orange[100],
  },
  "&[data-background-color='secondary']": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.08),
  },

  ...theme.applyStyles('dark', {
    "&[data-background-color='default']": {
      backgroundColor: theme.palette.action.hover,
    },
    "&[data-background-color='primary']": {
      backgroundColor: alpha(theme.palette.colors.primary[900], 0.3),
    },
    "&[data-background-color='blue']": {
      backgroundColor: alpha(theme.palette.colors.blue[900], 0.3),
    },
    "&[data-background-color='red']": {
      backgroundColor: alpha(theme.palette.colors.red[900], 0.3),
    },
    "&[data-background-color='green']": {
      backgroundColor: alpha(theme.palette.colors.green[900], 0.3),
    },
    "&[data-background-color='yellow']": {
      backgroundColor: alpha(theme.palette.colors.yellow[900], 0.3),
    },
    "&[data-background-color='orange']": {
      backgroundColor: alpha(theme.palette.colors.orange[900], 0.3),
    },
    "&[data-background-color='secondary']": {
      backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    },
  }),
}));
