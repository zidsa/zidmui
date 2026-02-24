import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

const createSwitchActiveStyles = (theme: CssVarsTheme, colorKey: 'primary' | 'error') => {
  const toggleCircleSize = theme.spacing(1.83);
  const pressedToggleCircleSize = theme.spacing(2.25);
  const transformValue = theme.spacing(0.5);

  return {
    '&:active': {
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette._components.switch?.[colorKey]?.pressedBackground,
        boxShadow: 'none',
      },
      '& .MuiSwitch-switchBase:not(.Mui-checked)': {
        '& + .MuiSwitch-track': {
          boxShadow: 'none',
        },
        '& .MuiSwitch-thumb': {
          width: `${pressedToggleCircleSize}`,
          transform: 'translateX(0)',
          borderRadius: toggleCircleSize,
        },
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        '& + .MuiSwitch-track': {
          boxShadow: 'none',
        },
        '& .MuiSwitch-thumb': {
          width: `${pressedToggleCircleSize}`,
          transform: `translateX(-${transformValue})`,
          borderRadius: toggleCircleSize,
        },
      },
    },
  };
};

export const MuiSwitch: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiSwitch'] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  variants: [
    {
      props: { color: 'primary' },
      style: ({ theme }) => ({
        ...createSwitchActiveStyles(theme, 'primary'),
        '& .MuiSwitch-switchBase.Mui-checked': {
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette._components.switch?.primary?.activeBackground,
          },
        },
      }),
    },
    {
      props: { color: 'error' },
      style: ({ theme }) => ({
        ...createSwitchActiveStyles(theme, 'error'),
        '& .MuiSwitch-switchBase.Mui-checked': {
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette._components.switch?.error?.activeBackground,
          },
        },
      }),
    },
  ],
  styleOverrides: {
    root: ({ theme }) => {
      const toggleSwitchWidth = theme.spacing(4);
      const toggleSwitchHeight = theme.spacing(2.5);
      const toggleCircleSize = theme.spacing(1.83);
      const innerMargin = theme.spacing(0.33);
      const shadowValue = theme.spacing(0, 0, 0, 0.25);
      const transformValue = theme.spacing(1.51); // 4 - 1.83 - 0.33 * 2 = 1.51

      return {
        width: toggleSwitchWidth,
        height: toggleSwitchHeight,
        padding: 0,
        overflow: 'visible',
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1.5),
        '&:hover': {
          '& .MuiSwitch-switchBase:not(.Mui-checked)': {
            '& + .MuiSwitch-track': {
              boxShadow: `${shadowValue} ${theme.palette._components.switch?.shadow}`,
            },
          },
          '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
            boxShadow: 'none',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: innerMargin,
          width: toggleCircleSize,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: `translateX(${transformValue})`,
            color: theme.palette._components?.switch?.knobFillEnabled,
            '& + .MuiSwitch-track': {
              opacity: 1,
              boxShadow: 'none',
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: theme.palette._components?.switch?.color,
            boxShadow: `${shadowValue} ${theme.palette._components?.switch?.background}`,
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette._components?.switch?.knobFillEnabled,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            boxShadow: 'none',
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: toggleCircleSize,
          height: toggleCircleSize,
          borderRadius: toggleCircleSize,
          borderWidth: theme.spacing(0.08375),
          borderStyle: 'solid',
          borderColor: theme.palette._components.switch.knowFillDisabled,
          boxShadow: theme.shadows[2],
          transition: theme.transitions.create(['transform'], {
            duration: 300,
          }),
        },
        '& .MuiSwitch-track': {
          borderRadius: theme.spacing(8.25),
          backgroundColor: theme.palette._components.switch?.slideFill,
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
          boxShadow: `${shadowValue} transparent`,
        },
      };
    },
  },
};
