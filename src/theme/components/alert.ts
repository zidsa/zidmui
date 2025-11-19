import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

//

export const MuiAlert: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAlert'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 12,
      flexWrap: 'wrap',
      [theme.breakpoints.down('md')]: {
        paddingInline: theme.spacing(1),
      },
      '&.MuiAlert-colorError': {
        color: 'inherit',
        borderColor: theme.palette.colors.red[300],
        background: theme.palette.colors.red[100],
        '.MuiAlert-icon': {
          color: theme.palette.colors.red[400],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette.colors.red[1000],
        },
      },
      '.MuiTypography-root.MuiAlertTitle-root': {
        margin: 0,
      },
      '.MuiAlert-icon': {
        flex: 0,
        paddingBlock: theme.spacing(0.75),
        alignItems: 'flex-start',
      },
      '.MuiAlert-message': {
        flex: 1,
        paddingBlock: theme.spacing(0.75),
        display: 'flex',
        alignItems: 'center',
      },
      '.MuiAlert-action': {
        paddingTop: theme.spacing(0.25),
        marginRight: 0,
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
          paddingLeft: theme.spacing(0.5),
        },
      },
      '&.MuiAlert-colorWarning': {
        color: 'inherit',
        borderColor: theme.palette.colors.yellow[500],
        background: theme.palette.colors.yellow[100],
        '.MuiAlert-icon': {
          color: theme.palette.colors.yellow[700],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: '#6F673B',
        },
      },
      '&.MuiAlert-colorInfo': {
        color: 'inherit',
        borderColor: theme.palette.colors.blue[400],
        background: theme.palette.colors.blue[100],
        '.MuiAlert-icon': {
          color: theme.palette.colors.blue[900],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette.colors.blue[1000],
        },
      },
      '&.MuiAlert-colorSuccess': {
        color: 'inherit',
        borderColor: theme.palette.colors.green[400],
        background: theme.palette.colors.green[100],
        '.MuiAlert-icon': {
          color: theme.palette.colors.green[600],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette.colors.green[1000],
        },
      },
    }),
  },
};
