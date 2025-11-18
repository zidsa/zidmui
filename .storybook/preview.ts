import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { themeParcel } from '../src/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';

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
