import '@mui/material';

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

  interface Palette {
    colors: Colors;
  }

  interface PaletteOptions {
    colors: Colors;
  }
}
