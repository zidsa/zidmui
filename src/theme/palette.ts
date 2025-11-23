import { ThemeOptions } from '@mui/material/styles';

import { colors } from './colors';

//
//

export const palette: ThemeOptions['palette'] = {
  mode: 'light',
  colors,
  badge: {
    primary: {
      color: '#8758C6',
      backgroundColor: '#F1EAFF',
    },
  },
  background: {
    default: '#F8F8F8',
    paper: colors.base.white,
    darkBackdrop: '#b1afafcc',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#F8F8F8',
    gray200: '#E4E4E5',
    gray100: '#F2F2F2',
    backgroundDisable: '#F2F2F2',
    Blur: 'rgba(255, 255, 255, 0.8)',
    green: '#9EEC99',
    yellow: '#FAE684',
    royal: '#3E1C56',
    mintGreen: '#84DA7E',
    goldenYellow: '#EAD469',
    lavenderGlow: '#C498FF',
    royalPurple: '#532D6F',
  },
  outlined: {
    outlined: '#E4E4E5',
    'outlined 2': '#F2F2F2',
    outlinedDisable: '#C6C6C8',
  },
  text: {
    primary: '#0E0217',
    secondary: '#1F0433',
    tertiary: '#75727B',
    disabled: '#C6C6C8',
    deepGreen: '#1F541B',
    darkOchre: '#544217',
    contrastText: '#A3A1A6',
    primaryContrastTest: '#FFFFFF',
    _states: {
      focusVisible: 'rgba(0, 0, 0, 0.3)',
    },
  },
  icon: {
    primary: '#0E0217',
    secondary: '#75727B',
    disabled: '#C6C6C8',
    draggable: '#634976',
  },
  tabs: {
    text: {
      secondary: '#1B0D26',
    },
  },
  _states: {
    focus: 'rgba(0, 0, 0, 0.12)',
    hover: 'rgba(96, 203, 203, 0.04)',
    selected: 'rgba(96, 203, 203, 0.08)',
    focusVisible: 'rgba(96, 203, 203, 0.3)',
    outlinedBorder: 'rgba(96, 203, 203, 0.5)',
  },
  primary: {
    main: '#AE72FF',
    dark: '#8758C6',
    light: '#D2B8FF',
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(174, 114, 255, 0.04)',
      selected: 'rgba(174, 114, 255, 0.08)',
      focus: 'rgba(174, 114, 255, 0.12)',
      focusVisible: 'rgba(174, 114, 255, 0.3)',
      outlinedBorder: 'rgba(174, 114, 255, 0.5)',
    },
  },
  secondary: {
    main: '#3C1C54',
    dark: '#2E1641',
    light: '#8A7798',
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(60, 28, 84, 0.04)',
      selected: 'rgba(60, 28, 84, 0.08)',
      focus: 'rgba(60, 28, 84, 0.12)',
      focusVisible: 'rgba(60, 28, 84, 0.3)',
      outlinedBorder: 'rgba(60, 28, 84, 0.5)',
    },
  },
  action: {
    active: 'rgba(31, 4, 51, 0.56)',
    hover: 'rgba(31, 4, 51, 0.04)',
    selected: 'rgba(31, 4, 51, 0.08)',
    focus: 'rgba(31, 4, 51, 0.12)',
    disabled: 'rgba(31, 4, 51, 0.38)',
    disabledBackground: 'rgba(31, 4, 51, 0.12)',
  },
  error: {
    main: '#FA3768',
    _states: {
      hover: 'rgba(250, 55, 104, 0.04)',
      selected: 'rgba(250, 55, 104, 0.08)',
      focusVisible: 'rgba(250, 55, 104, 0.3)',
      outlinedBorder: 'rgba(250, 55, 104, 0.5)',
    },
    dark: '#C22B51',
    light: '#FCA7B4',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F9E683',
    dark: '#DFCE75',
    light: '#FBF0BF',
    contrastText: '#6F673B',
    _states: {
      hover: 'rgba(193, 178, 101, 0.04)',
      selected: 'rgba(193, 178, 101, 0.08)',
      focusVisible: 'rgba(193, 178, 101, 0.3)',
      outlinedBorder: 'rgba(193, 178, 101, 0.5)',
    },
  },
  info: {
    main: '#60CBCB',
    dark: '#449090',
    light: '#95E9E9',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#9EEC98',
    dark: '#649560',
    light: '#DDF8DC',
    contrastText: '#000000',
    // 'contrastText 2': '#FFFFFF',
    _states: {
      outlinedBorder: 'rgba(46, 125, 50, 0.5)',
      focusVisible: 'rgba(46, 125, 50, 0.3)',
      hover: 'rgba(46, 125, 50, 0.04)',
    },
  },
  divider: '#F4F3F5',
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
    sliderIndicator: {
      background: 'rgba(255, 255, 255, 0.2)',
      active: 'rgba(255, 255, 255, 1)',
      inactive: 'rgba(255, 255, 255, 0.8)',
    },
    cardContent: {
      selected: {
        background: '#FBF9FF',
        border: '#E2D2FF',
      },
    },
    emptyState: {
      imageBackground: 'rgba(0, 0, 0, 0.04)',
    },
    navbar: {
      wallet: {
        background: '#F8F5FF',
        border: '#EBE8ED',
        text: '#1B0D26',
      },
      search: {
        searchBorder: '#EFEFF1',
        searchBackground: '#FBFBFB',
      },
    },
    avatar: {
      fill: '#A3A1A6',
    },
    input: {
      _states: {
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        focusVisible: 'rgba(0, 0, 0, 0.3)',
      },
      outlined: {
        enabledBorder: '#EBE8ED',
        hoverBorder: '#D8D2DD',
      },
    },
    switch: {
      knobFillEnabled: '#F8F8F8',
      slideFill: '#C6C6C8',
      knowFillDisabled: '#F2F2F2',
      shadow: '#E4E4E5',
      color: '#AE72FF',
      background: '#FFFFFF',
      error: {
        activeBackground: '#FA3768',
        pressedBackground: '#C22B51',
        shadow: 'rgba(250, 55, 104, 0.5)',
      },
      primary: {
        activeBackground: '#9EEC98',
        pressedBackground: '#649560',
        shadow: 'rgba(46, 125, 50, 0.5)',
      },
    },
    chip: {
      desert: '#FDF5D6',
    },
    backdrop: {
      fill: 'rgba(0, 0, 0, 0.1)',
    },
    appBar: {
      defaultFill: '#F2F2F2',
    },
    alert: {
      error: {
        color: '#70192F',
        border: '#FDC9D0',
        background: '#FFF3F4',
      },
      warning: {
        color: '#6F673B',
        border: '#FAEBA4',
        background: '#FEFDF5',
      },
      info: {
        color: '#306666',
        border: '#B5EFEF',
        background: '#F4FCFC',
      },
      success: {
        color: '#476A44',
        border: '#CAF4C8',
        background: '#F7FDF7',
      },
    },
    stepper: {
      connector: '#A3A1A6',
    },
    iconButton: {
      default: {
        hover: '#0000001f',
      },
      primary: {
        text: '#4E3372',
        focused: '#ae72ff4d',
        hover: '#FBF9FF',
        focusedIcon: '#ae72ff',
      },
      secondary: {
        text: '#1B0D26',
        focused: '#3c1c544d',
        hover: '#F4F3F5',
        focusedIcon: '#ae72ff',
      },
      error: {
        text: '#1B0D26',
        focused: '#fa37684d',
        hover: '#F4F3F5',
        focusedIcon: '#ae72ff',
      },
    },
  },
  _native: {
    'scrollbar-bg': '#E4E4E5',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
    white_states: {
      main: '#FFFFFF',
      focusVisible: 'rgba(255, 255, 255, 0.3)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    black_states: {
      focus: 'rgba(0, 0, 0, 0.12)',
      hover: ' rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
    },
  },
};
