import '@mui/material';

//

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primaryDark: true;
    primaryLight: true;
    tertiary: true;
  }
}

//

declare module '@mui/material/styles' {
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

  interface _Components {
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
  }

  //

  interface Palette {
    colors: Colors;
    _components: _Components;
  }

  interface PaletteOptions {
    colors: Colors;
    _components: _Components;
  }
}
