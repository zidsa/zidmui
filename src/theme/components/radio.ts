import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiRadio: Components<Theme & CssVarsTheme>['MuiRadio'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingInline: 0,
      variants: [
        //
        //sizes:
        {
          props: { size: 'small' },
          style: {
            '& .MuiSvgIcon-root': { width: theme.spacing(2), height: theme.spacing(2) },
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
          },
        },
        {
          props: { size: 'medium' },
          style: {
            '& .MuiSvgIcon-root': { width: theme.spacing(2.5), height: theme.spacing(2.5) },
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
          },
        },
        {
          props: { size: 'large' },
          style: {
            '& .MuiSvgIcon-root': { width: theme.spacing(3), height: theme.spacing(3) },
            // width: theme.spacing(5.75),
            // height: theme.spacing(5.75),
            padding: 0,
          },
        },
        //
        // primary colors, unchecked:
        {
          props: { color: 'primary', checked: false },
          style: {
            '& .MuiSvgIcon-root': { fill: theme.palette.text.secondary },
            '&.Mui-disabled .MuiSvgIcon-root': { fill: theme.palette.action.disabled },
            '&:hover': { backgroundColor: theme.palette.primary._states?.hover },
            '&.Mui-focusVisible': { backgroundColor: theme.palette.action.disabledBackground },
            '&:active': { backgroundColor: theme.palette.action.disabledBackground },
          },
        },
        //
        // primary colors, checked:
        {
          props: { color: 'primary', checked: true },
          style: {
            '& .MuiSvgIcon-root': { fill: theme.palette.colors.primary[1000] },
            '&.Mui-disabled .MuiSvgIcon-root': { fill: theme.palette.action.disabled },
            '&:hover': { backgroundColor: theme.palette.primary._states?.hover },
            '&.Mui-focusVisible': { backgroundColor: theme.palette.primary._states?.focusVisible },
            '&:active': { backgroundColor: theme.palette.primary._states?.focusVisible },
          },
        },
        //
        // error colors, unchecked:
        {
          props: { color: 'error', checked: false },
          style: {
            '& .MuiSvgIcon-root': { fill: theme.palette.text.secondary },
            '&.Mui-disabled .MuiSvgIcon-root': { fill: theme.palette.action.disabled },
            '&:hover': { backgroundColor: theme.palette.error._states?.hover },
            '&.Mui-focusVisible': { backgroundColor: theme.palette.action.disabledBackground },
            '&:active': { backgroundColor: theme.palette.action.disabledBackground },
          },
        },
        //
        // error colors, checked:
        {
          props: { color: 'error', checked: true },
          style: {
            '& .MuiSvgIcon-root': { fill: theme.palette.error.main },
            '&.Mui-disabled .MuiSvgIcon-root': { fill: theme.palette.action.disabled },
            '&:hover': { backgroundColor: theme.palette.error._states?.hover },
            '&.Mui-focusVisible': { backgroundColor: theme.palette.error._states?.focusVisible },
            '&:active': { backgroundColor: theme.palette.error._states?.focusVisible },
          },
        },
      ],
    }),
  },
};
