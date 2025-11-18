import { ThemeOptions } from '@mui/material/styles';

import { colors } from './colors';

//
//

export const palette: ThemeOptions['palette'] = {
  mode: 'light',
  colors,
  _components: {
    button: {
      disabledText: '#A3A1A6',
      disabledBorder: '#E4E4E5',
      primaryDarkText: {
        disabled: '#F2F2F2',
        text: '#8758C6',
        loadingText: '#8758C6',
      },
      primary: {
        contained: colors.primary[1000],
        hover: colors.primary[900],
        focused: colors.primary[900],
        pressed: colors.primary[600],
        disabled: '#F2F2F2',
        border: '#EBE8ED',
        text: colors.base.white,
        loadingText: '#4E3372',
      },
      secondary: {
        contained: '#F4F3F5',
        hover: '#F4F3F5',
        focused: '#F1EAFF',
        pressed: '#EBE8ED',
        disabled: '#F2F2F2',
        border: '#D8D2DD',
        text: '#1B0D26',
        loadingText: '#1B0D26',
      },
      tertiary: {
        contained: colors.base.white,
        hover: colors.primary[200],
        focused: colors.primary[200],
        pressed: colors.primary[300],
        disabled: '#F2F2F2',
        text: '#1B0D26',
        loadingText: '#1B0D26',
        outlinedHover: '#E0D3FF',
        outlinedText: '#4E3372',
      },
      error: {
        contained: '#FEE5E9',
        hover: '#FDC9D0',
        focused: '#FA3768',
        pressed: '#FDC9D0',
        disabled: '#F2F2F2',
        border: '#FCA7B4',
        text: '#70192F',
        outlinedHover: '#FFF3F4',
        outlinedText: '#C22B51',
        activeBorder: '#E0315D',
        loadingText: '#1B0D26',
      },
    },
  },
};
