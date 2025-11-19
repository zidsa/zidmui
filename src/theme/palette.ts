import { ThemeOptions } from '@mui/material/styles';

import { colors } from './colors';

//
//

export const palette: ThemeOptions['palette'] = {
  mode: 'light',
  colors,
  _components: {
    button: {
      disabledText: colors.neutrals[400],
      disabledBorder: colors.neutrals[200],
      primaryDarkText: {
        disabled: colors.neutrals[100],
        text: colors.primary[800],
        loadingText: colors.primary[800],
      },
      primary: {
        contained: colors.primary[1000],
        hover: colors.primary[900],
        focused: colors.primary[900],
        pressed: colors.primary[600],
        disabled: colors.neutrals[100],
        border: '#EBE8ED',
        text: colors.base.white,
        loadingText: colors.primary[1000],
      },
      secondary: {
        contained: '#F4F3F5',
        hover: '#F4F3F5',
        focused: colors.primary[200],
        pressed: '#EBE8ED',
        disabled: colors.neutrals[100],
        border: '#D8D2DD',
        text: colors.secondary[1000],
        loadingText: colors.secondary[1000],
      },
      tertiary: {
        contained: colors.base.white,
        hover: colors.primary[200],
        focused: colors.primary[200],
        pressed: colors.primary[300],
        disabled: colors.neutrals[100],
        text: colors.secondary[1000],
        loadingText: colors.secondary[1000],
        outlinedHover: '#E0D3FF',
        outlinedText: colors.primary[1000],
      },
      error: {
        contained: colors.red[200],
        hover: colors.red[300],
        focused: colors.red[600],
        pressed: colors.red[300],
        disabled: colors.neutrals[100],
        border: colors.red[400],
        text: colors.red[1000],
        outlinedHover: colors.red[100],
        outlinedText: colors.red[800],
        activeBorder: colors.red[700],
        loadingText: colors.secondary[1000],
      },
    },
  },
};
