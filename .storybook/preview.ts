import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { useEffect } from 'react';

import { themeParcel } from '../src/theme/theme';
import { themeParcelDark } from '../src/theme/theme.dark';

//
//

const WithDataTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return Story();
};

export const decorators = [
  WithDataTheme,
  withThemeFromJSXProvider({
    themes: {
      light: themeParcel,
      dark: themeParcelDark,
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
