import { ThemeOptions } from '@mui/material';

//
//

const variant = 'IBM Plex Sans Arabic, -apple-system, Helvetica, Arial, sans-serif';

export const typography: ThemeOptions['typography'] = {
  fontFamily: variant,
  h1: {
    fontWeight: 400,
    letterSpacing: -1.5,
  },
  h2: {
    fontWeight: 400,
    letterSpacing: -0.5,
  },
  h3: {
    fontWeight: 400,
  },
  h4: {
    fontWeight: 500,
    letterSpacing: 0.25,
  },
  h5: {
    fontWeight: 500,
  },
  h6: {
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  body1: {
    fontWeight: 400,
    letterSpacing: 0.15,
  },
  body2: {
    fontWeight: 400,
    letterSpacing: 0.17,
  },
  subtitle1: {
    fontWeight: 500,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontWeight: 500,
    letterSpacing: 0.1,
  },
  overline: {
    fontWeight: 400,
    letterSpacing: 1,
  },
  caption: {
    fontWeight: 400,
    letterSpacing: 0.4,
  },
};
