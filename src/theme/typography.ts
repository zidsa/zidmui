import { ThemeOptions } from '@mui/material';

//
//

const variant1 = 'Suisse Intl, -apple-system, Helvetica, Arial, sans-serif';
const variant2 = 'Codec Pro, -apple-system, Helvetica, Arial, sans-serif';

export const typography: ThemeOptions['typography'] = {
  fontFamily: variant1,
  h1: {
    fontFamily: variant2,
    fontWeight: 400,
    letterSpacing: -1.5,
  },
  h2: {
    fontFamily: variant2,
    fontWeight: 400,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: variant2,
    fontWeight: 400,
  },
  h4: {
    fontFamily: variant2,
    fontWeight: 400,
    letterSpacing: 0.25,
  },
  h5: {
    fontFamily: variant2,
    fontWeight: 400,
  },
  h6: {
    fontFamily: variant2,
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
