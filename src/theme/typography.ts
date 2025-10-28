import { ThemeOptions } from '@mui/material';

//
//

const variant = 'IBM Plex Sans Arabic, -apple-system, Helvetica, Arial, sans-serif'
 

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
    fontWeight: 400,
    letterSpacing: 0.25,
  },
  h5: {
    fontWeight: 400,
  },
  h6: {
    fontWeight: 400,
    letterSpacing: 0.15,
  },
  body1: {
    letterSpacing: 0.15,
  },
  body2: {
    letterSpacing: 0.17,
  },
  subtitle1: {
    fontWeight: 500,
  },
  subtitle2: {
    letterSpacing: 0.1,
  },
  overline: {
    letterSpacing: 1,
  },
  caption: {
    letterSpacing: 0.4,
  },
};
