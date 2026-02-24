import { MuiAlert } from './components/alert';
import { MuiButton } from './components/button';
import { MuiChip } from './components/chip';
import { MuiList, MuiListItemText, MuiListItemIcon } from './components/list';
import { MuiStack } from './components/stack';
import { MuiTooltip } from './components/tooltip';
import { MuiTypography } from './components/typography';
import { MuiDivider } from './components/divider';
import { MuiIconButton } from './components/icon-button';
import { MuiTab } from './components/tab';
import { MuiTabs } from './components/tabs';
import { MuiSkeleton } from './components/skeleton';
import { MuiCheckbox } from './components/checkbox';
import { MuiDialog, MuiDialogTitle, MuiDialogContent, MuiDialogActions } from './components/dialog';
import { MuiInputAdornment } from './components/input-adornment';
import { MuiInputBase } from './components/input-base';
import { MuiInputLabel } from './components/input-label';
import { MuiTextField } from './components/text-field';
import { MuiPagination } from './components/pagination';
import { MuiSwitch } from './components/switch';

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
  MuiTooltip,
  MuiDivider,
  MuiIconButton,
  MuiTabs,
  MuiTab,
  MuiSkeleton,
  MuiCheckbox,
  MuiDialog,
  MuiDialogTitle,
  MuiDialogContent,
  MuiDialogActions,
  MuiTextField,
  MuiInputBase,
  MuiInputLabel,
  MuiInputAdornment,
  MuiPagination,
  MuiSwitch,
};
