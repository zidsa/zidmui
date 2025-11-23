import '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primaryDark: true;
    primaryLight: true;
    tertiary: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    extraSmall: true;
  }
}
declare module '@mui/material/Radio' {
  interface RadioPropsSizeOverrides {
    small: true;
    medium: true;
    large: true;
  }
}

declare module '@mui/lab' {
  interface TimelineProps {
    noOppositeContent?: boolean;
  }
}

declare module '@mui/material' {
  interface CustomPalette {
    badge: {
      primary: {
        color: '#8758C6';
        backgroundColor: '#F1EAFF';
      };
    };
    outlined?: {
      outlined?: string;
      'outlined 2'?: string;
      outlinedDisable?: string;
    };
    tabs: {
      text: {
        secondary: string;
      };
    };
    icon: {
      primary: string;
      secondary: string;
      disabled: string;
      draggable: string;
    };
    _states: {
      focus: string;
      hover: string;
      selected: string;
      focusVisible: string;
      outlinedBorder: string;
    };

    _components: {
      sliderIndicator: {
        active: string;
        inactive: string;
        background: string;
      };
      cardContent: {
        selected: {
          background: string;
          border: string;
        };
      };
      emptyState: {
        imageBackground: string;
      };
      navbar: {
        wallet: {
          background: string;
          border: string;
          text: string;
        };
        search: {
          searchBorder: string;
          searchBackground: string;
        };
      };
      avatar: {
        fill: string;
      };
      input: {
        _states: {
          hover: string;
          selected: string;
          focusVisible: string;
        };
        outlined: {
          enabledBorder: string;
          hoverBorder: string;
        };
      };
      switch: {
        knobFillEnabled: string;
        slideFill: string;
        knowFillDisabled: string;
        shadow: string;
        color: string;
        background: string;
        primary: {
          activeBackground: string;
          pressedBackground: string;
          shadow: string;
        };
        error: {
          activeBackground: string;
          pressedBackground: string;
          shadow: string;
        };
      };
      chip: {
        desert: string;
      };
      backdrop: {
        fill: string;
      };
      appBar: {
        defaultFill: string;
      };
      alert: {
        error: {
          color: string;
          border: string;
          background: string;
        };
        warning: {
          color: string;
          border: string;
          background: string;
        };
        info: {
          color: string;
          border: string;
          background: string;
        };
        success: {
          color: string;
          border: string;
          background: string;
        };
      };
      stepper: {
        connector: string;
      };
      button: {
        disabledText: string;
        disabledBorder: string;
        primaryDarkText: {
          disabled: string;
          text: string;
          loadingText: string;
        };
        primary: {
          contained?: string;
          hover: string;
          focused: string;
          pressed: string;
          disabled: string;
          border: string;
          text: string;
          loadingText: string;
        };
        secondary: {
          contained?: string;
          hover: string;
          focused: string;
          pressed: string;
          disabled: string;
          border: string;
          text: string;
          loadingText: string;
        };
        tertiary: {
          contained: string;
          hover: string;
          focused: string;
          pressed: string;
          disabled: string;
          text: string;
          outlinedHover: string;
          outlinedText: string;
          loadingText: string;
        };
        error: {
          contained?: string;
          hover: string;
          focused: string;
          pressed: string;
          disabled: string;
          border: string;
          text: string;
          outlinedHover: string;
          outlinedText: string;
          activeBorder: string;
          loadingText: string;
        };
      };
      iconButton: {
        default: {
          hover: string;
        };
        primary: {
          text: string;
          focused: string;
          hover: string;
          focusedIcon: string;
        };
        secondary: {
          text: string;
          focused: string;
          hover: string;
          focusedIcon: string;
        };
        error: {
          text: string;
          focused: string;
          hover: string;
          focusedIcon: string;
        };
      };
    };
    _native: {
      'scrollbar-bg': string;
    };
  }

  interface PaletteOptions extends CustomPalette {}

  interface Palette extends CustomPalette {}

  //

  type ColorShadesKey = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
  interface Colors {
    base: {
      white: string;
      neutral: string;
      silver: string;
      black: string;
    };
    primary: { [key in ColorShadesKey]: string };
    secondary: { [key in ColorShadesKey]: string };
    neutrals: { [key in ColorShadesKey]: string };
    green: { [key in ColorShadesKey]: string };
    blue: { [key in ColorShadesKey]: string };
    yellow: { [key in ColorShadesKey]: string };
    orange: { [key in ColorShadesKey]: string };
    red: { [key in ColorShadesKey]: string };
  }

  //

  interface Palette {
    colors: Colors;
  }

  interface PaletteOptions {
    colors: Colors;
  }

  //
  interface TypeText {
    tertiary: string;
    deepGreen: string;
    darkOchre: string;
    contrastText: string;
    primaryContrastTest: string;
    _states: {
      focusVisible: string;
    };
  }

  interface CommonColors {
    black_states: {
      hover: string;
      selected: string;
      focus: string;
    };
    white_states: {
      main: string;
      focusVisible: string;
      focus: string;
    };
  }

  interface TypeBackground {
    white: string;
    black: string;
    gray: string;
    gray200: string;
    gray100: string;
    backgroundDisable: string;
    darkBackdrop: string;
    Blur: string;
    green: string;
    yellow: string;
    royal: string;
    mintGreen: string;
    goldenYellow: string;
    lavenderGlow: string;
    royalPurple: string;
  }

  interface SimplePaletteColorOptions {
    _states?: {
      hover?: string;
      selected?: string;
      focus?: string;
      focusVisible?: string;
      outlinedBorder?: string;
    };
  }
  interface PaletteColor {
    _states?: {
      hover?: string;
      selected?: string;
      focus?: string;
      focusVisible?: string;
      outlinedBorder?: string;
    };
  }

  interface Theme {
    shape: {
      borderRadius: number;
      standardBorderRadius: number;
    };
  }
  interface ThemeOptions {
    shape?: {
      borderRadius: number;
      standardBorderRadius: number; // Add custom property to options as well
    };
  }
}
