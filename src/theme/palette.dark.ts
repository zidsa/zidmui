import { colors } from './colors';
import { alpha, ThemeOptions } from '@mui/material';

//
//

export const paletteDark: ThemeOptions['palette'] = {
  mode: 'dark',
  colors,
  badge: {
    primary: {
      color: '#D2B8FF',
      backgroundColor: '#3C1C54',
    },
  },
  background: {
    default: '#0D0D1A',
    paper: '#1A1A2E',
    darkBackdrop: 'rgba(0, 0, 0, 0.6)',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#1D1D35',
    // gray100 is the border/outline token (#383354); gray200 is the deeper background shade (#1C1C37)
    gray200: '#1C1C37',
    gray100: '#383354',
    backgroundDisable: '#1C1C37',
    Blur: 'rgba(26, 26, 46, 0.8)',
    green: '#1B3A1A',
    yellow: '#3A3520',
    royal: '#3E1C56',
    mintGreen: '#1B3A1A',
    goldenYellow: '#3A3520',
    lavenderGlow: '#3C1C54',
    royalPurple: '#532D6F',
    sidebar: '#16162B',
    container: '#13182A',
  },
  outlined: {
    outlined: '#383354',
    outlined_2: '#383354',
    outlinedDisable: '#252540',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A3A1A6',
    tertiary: '#B1A4BB',
    disabled: '#75727B',
    deepGreen: '#9EEC98',
    darkOchre: '#F9E683',
    contrastText: '#A3A1A6',
    primaryContrastTest: '#FFFFFF',
    _states: {
      hover: alpha('#FFFFFF', 0.04),
      selected: alpha('#FFFFFF', 0.08),
      focus: alpha('#FFFFFF', 0.12),
      focusVisible: alpha('#FFFFFF', 0.3),
    },
  },
  icon: {
    primary: '#FFFFFF',
    secondary: '#A3A1A6',
    disabled: '#75727B',
    draggable: '#B1A4BB',
  },
  tabs: {
    text: {
      secondary: '#FFFFFF',
    },
  },
  _states: {
    focus: 'rgba(255, 255, 255, 0.12)',
    hover: 'rgba(96, 203, 203, 0.08)',
    selected: 'rgba(96, 203, 203, 0.16)',
    focusVisible: 'rgba(96, 203, 203, 0.3)',
    outlinedBorder: 'rgba(96, 203, 203, 0.5)',
  },
  primary: {
    main: '#8758C6',
    dark: '#6E48A1',
    light: '#AE72FF',
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(135, 88, 198, 0.12)',
      selected: 'rgba(135, 88, 198, 0.20)',
      focus: 'rgba(135, 88, 198, 0.24)',
      focusVisible: 'rgba(135, 88, 198, 0.3)',
      outlinedBorder: 'rgba(135, 88, 198, 0.5)',
    },
  },
  secondary: {
    main: '#8A7798',
    dark: '#6B5A7D',
    light: '#B1A4BB',
    contrastText: '#FFFFFF',
    _states: {
      hover: 'rgba(138, 119, 152, 0.12)',
      selected: 'rgba(138, 119, 152, 0.20)',
      focus: 'rgba(138, 119, 152, 0.24)',
      focusVisible: 'rgba(138, 119, 152, 0.3)',
      outlinedBorder: 'rgba(138, 119, 152, 0.5)',
    },
  },
  action: {
    active: alpha('#FFFFFF', 0.56),
    hover: alpha('#FFFFFF', 0.08),
    selected: alpha('#FFFFFF', 0.16),
    focus: alpha('#FFFFFF', 0.12),
    disabled: alpha('#FFFFFF', 0.38),
    disabledBackground: alpha('#FFFFFF', 0.12),
  },
  error: {
    main: '#FA3768',
    _states: {
      hover: 'rgba(250, 55, 104, 0.12)',
      selected: 'rgba(250, 55, 104, 0.20)',
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
      hover: 'rgba(193, 178, 101, 0.12)',
      selected: 'rgba(193, 178, 101, 0.20)',
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
    _states: {
      outlinedBorder: 'rgba(46, 125, 50, 0.5)',
      focusVisible: 'rgba(46, 125, 50, 0.3)',
      hover: 'rgba(46, 125, 50, 0.12)',
    },
  },
  divider: '#383354',
  _components: {
    button: {
      disabledText: '#75727B',
      disabledBorder: '#252540',
      primaryDarkText: {
        disabled: '#252540',
        text: colors.primary[400],
        loadingText: colors.primary[400],
      },
      primary: {
        contained: colors.primary[1000],
        hover: colors.primary[900],
        focused: colors.primary[900],
        pressed: colors.primary[600],
        disabled: '#252540',
        border: '#1C1C37',
        text: colors.base.white,
        loadingText: colors.primary[1000],
      },
      secondary: {
        contained: '#1D1D35',
        hover: '#252540',
        focused: '#252540',
        pressed: '#1C1C37',
        disabled: '#252540',
        border: '#D8D2DD',
        text: '#FFFFFF',
        loadingText: '#FFFFFF',
      },
      tertiary: {
        contained: '#1A1A2E',
        hover: '#252540',
        focused: '#252540',
        pressed: '#1C1C37',
        disabled: '#252540',
        text: '#FFFFFF',
        loadingText: '#FFFFFF',
        outlinedHover: '#3C1C54',
        outlinedText: colors.primary[400],
      },
      error: {
        contained: 'rgba(250, 55, 104, 0.15)',
        hover: 'rgba(250, 55, 104, 0.25)',
        focused: colors.red[600],
        pressed: 'rgba(250, 55, 104, 0.25)',
        disabled: '#252540',
        border: colors.red[400],
        text: colors.red[400],
        outlinedHover: 'rgba(250, 55, 104, 0.12)',
        outlinedText: colors.red[400],
        activeBorder: colors.red[700],
        loadingText: '#FFFFFF',
      },
    },
    sliderIndicator: {
      background: 'rgba(255, 255, 255, 0.2)',
      active: 'rgba(255, 255, 255, 1)',
      inactive: 'rgba(255, 255, 255, 0.8)',
    },
    cardContent: {
      selected: {
        background: '#252540',
        border: '#3C1C54',
      },
    },
    emptyState: {
      imageBackground: 'rgba(255, 255, 255, 0.04)',
    },
    navbar: {
      wallet: {
        background: '#252540',
        border: '#1C1C37',
        text: '#FFFFFF',
      },
      search: {
        searchBorder: '#1C1C37',
        searchBackground: '#1D1D35',
      },
    },
    avatar: {
      fill: '#75727B',
    },
    input: {
      _states: {
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        focusVisible: 'rgba(255, 255, 255, 0.3)',
      },
      outlined: {
        enabledBorder: '#383354',
        hoverBorder: '#4D4875',
      },
    },
    switch: {
      knobFillEnabled: '#1D1D35',
      slideFill: '#75727B',
      knowFillDisabled: '#252540',
      shadow: '#1C1C37',
      color: '#AE72FF',
      background: '#1A1A2E',
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
      desert: '#3A3520',
    },
    backdrop: {
      fill: 'rgba(0, 0, 0, 0.4)',
    },
    appBar: {
      defaultFill: '#1C1C37',
    },
    alert: {
      error: {
        color: colors.red[400],
        border: 'rgba(250, 55, 104, 0.3)',
        background: 'rgba(250, 55, 104, 0.1)',
        icon: colors.red[400],
      },
      warning: {
        color: colors.yellow[600],
        border: 'rgba(249, 230, 131, 0.3)',
        background: 'rgba(249, 230, 131, 0.1)',
        icon: colors.yellow[600],
      },
      info: {
        color: colors.blue[500],
        border: 'rgba(96, 203, 203, 0.3)',
        background: 'rgba(96, 203, 203, 0.1)',
        icon: colors.blue[500],
      },
      success: {
        color: colors.green[500],
        border: 'rgba(158, 236, 152, 0.3)',
        background: 'rgba(158, 236, 152, 0.1)',
        icon: colors.green[500],
      },
    },
    stepper: {
      connector: '#75727B',
    },
    iconButton: {
      default: {
        hover: 'rgba(255, 255, 255, 0.12)',
      },
      primary: {
        text: colors.primary[400],
        focused: 'rgba(135, 88, 198, 0.3)',
        hover: 'rgba(135, 88, 198, 0.12)',
        focusedIcon: colors.primary[400],
      },
      secondary: {
        text: '#FFFFFF',
        focused: 'rgba(138, 119, 152, 0.3)',
        hover: 'rgba(138, 119, 152, 0.12)',
        focusedIcon: colors.primary[400],
      },
      error: {
        text: '#FFFFFF',
        focused: 'rgba(250, 55, 104, 0.3)',
        hover: 'rgba(250, 55, 104, 0.12)',
        focusedIcon: colors.primary[400],
      },
    },
  },
  _native: {
    'scrollbar-bg': '#1C1C37',
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
      focus: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
    },
  },
};
