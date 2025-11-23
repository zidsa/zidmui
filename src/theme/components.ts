import { MuiAlert } from './components/alert';
import { MuiButton } from './components/button';
import { MuiChip } from './components/chip';
import { MuiList, MuiListItemText, MuiListItemIcon } from './components/list';
import { MuiStack } from './components/stack';
import { MuiTypography } from './components/typography';

//
//

// NOTE: We use any here to avoid type inference issues
// oxlint-disable-next-line @typescript-eslint/no-explicit-any
export const components: Record<string, any> = {
  MuiTypography,
  MuiChip,
  MuiButton,
  MuiAlert,
  MuiStack,
  MuiList,
  MuiListItemText,
  MuiListItemIcon,
};
