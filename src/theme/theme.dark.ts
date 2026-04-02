import { createTheme } from '@mui/material';

import { components } from './components';
import { paletteDark } from './palette.dark';
import { shadowsDark } from './shadows.dark';
import { typography } from './typography';

//
//

export const themeParcelDark = createTheme({
  shape: {
    borderRadius: 8,
    standardBorderRadius: 12,
  },
  typography,
  components,
  palette: paletteDark,
  shadows: shadowsDark,
});
