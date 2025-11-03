import type { Preview } from '@storybook/react-vite';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { themeParcel } from '../src/theme/theme';

//
//

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: themeParcel,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

//

const preview: Preview = {
  decorators,
};

export default preview;
