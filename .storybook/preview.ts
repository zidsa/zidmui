import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { useEffect } from 'react';

import { themeParcel } from '../src/theme/theme';
import { themeParcelDark } from '../src/theme/theme.dark';

//
//

const withDataTheme = (Story: any, context: any) => {
  const theme = context.globals.theme || 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => document.documentElement.removeAttribute('data-theme');
  }, [theme]);

  return Story();
};

export const decorators = [
  withDataTheme,
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
