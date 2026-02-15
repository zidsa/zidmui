import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

import brandImage from './zid-logo.svg';

const theme = create({
  base: 'light',
  brandTitle: 'Zid MUI',
  brandUrl: 'https://ui.zid.sa',
  brandImage,
});

addons.setConfig({ theme });
