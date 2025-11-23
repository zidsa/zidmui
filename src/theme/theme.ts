import { createTheme } from '@mui/material';

import { components } from './components';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

//
//

export const themeParcel = createTheme({
  shape: {
    borderRadius: 8,
    standardBorderRadius: 12,
  },
  typography,
  components,
  palette,
  shadows,
});
