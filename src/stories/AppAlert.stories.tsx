import type { Meta, StoryObj } from '@storybook/react-vite';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { AppAlert, AppAlertButton } from '../components/app-alert';
import { AppTypography } from '../components/app-typography';

//
//

const shortTitle = 'Cupidatat proident dolor pariatur';
const shortContent =
  'Nostrud commodo sunt ipsum dolore incididunt laboris exercitation pariatur duis.';

const longTitle =
  'Cupidatat proident dolor pariatur cupidatat proident dolor pariatur cupidatat proident dolor pariatur cupidatat proident dolor pariatur';
const longContent =
  'Nostrud commodo sunt ipsum dolore incididunt laboris exercitation pariatur duis qui Lorem pariatur nulla reprehenderit. Nostrud commodo sunt ipsum dolore incididunt laboris exercitation pariatur duis qui Lorem pariatur nulla reprehenderit.';

// Meta
const meta = {
  title: 'App Alert',
  component: AppAlert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Variants: Story = {
  render: () => {
    const onClose = () => {};

    return (
      <>
        <Stack spacing={2}>
          <AppTypography variant="h6">Variants</AppTypography>

          <AppAlert title={shortTitle} />
          <AppAlert title={shortTitle} content={shortContent} />

          <Box />

          <AppAlert severity="error" title={shortTitle} />
          <AppAlert severity="error" title={shortTitle} content={shortContent} onClose={onClose} />

          <Box />

          <AppAlert severity="info" title={shortTitle} onClose={onClose} />
          <AppAlert severity="info" title={shortTitle} content={shortContent} onClose={onClose} />

          <Box />

          <AppAlert severity="warning" title={shortTitle} />
          <AppAlert
            severity="warning"
            title={shortTitle}
            content={shortContent}
            onClose={onClose}
          />

          <Box />
          <AppTypography variant="h6">Cases</AppTypography>

          <Box />

          <AppTypography variant="h6">Title Only</AppTypography>

          <AppAlert title={shortTitle} />
          <AppAlert title={shortTitle} onClose={onClose} />

          <Box />

          <AppAlert severity="warning" title={longTitle} />
          <AppAlert severity="warning" title={longTitle} onClose={onClose} />

          <Box />

          <AppTypography variant="h6">Content Only</AppTypography>

          <AppAlert severity="info" content={shortContent} />
          <AppAlert severity="info" content={shortContent} onClose={onClose} />

          <Box />

          <AppAlert severity="warning" content={longContent} />
          <AppAlert severity="warning" content={longContent} onClose={onClose} />

          <Box />

          <AppTypography variant="h6">Short Title and Short Content</AppTypography>

          <AppAlert severity="info" title={shortTitle} content={shortContent} />
          <AppAlert severity="info" title={shortTitle} content={shortContent} onClose={onClose} />

          <Box />

          <AppTypography variant="h6">Long Title and Short Content</AppTypography>

          <AppAlert severity="info" title={longTitle} content={shortContent} />
          <AppAlert severity="info" title={longTitle} content={shortContent} onClose={onClose} />

          <Box />

          <AppTypography variant="h6">Short Title and Long Content</AppTypography>

          <AppAlert severity="info" title={shortTitle} content={longContent} />
          <AppAlert severity="info" title={shortTitle} content={longContent} onClose={onClose} />

          <Box />

          <AppTypography variant="h6">Long Title and Long Content</AppTypography>

          <AppAlert severity="info" title={longTitle} content={longContent} />
          <AppAlert severity="info" title={longTitle} content={longContent} onClose={onClose} />

          <AppTypography variant="h6">With Actions</AppTypography>
          <AppAlert
            severity="info"
            title={shortTitle}
            actions={<AppAlertButton>Button</AppAlertButton>}
          />
          <AppAlert
            severity="info"
            content={shortContent}
            actions={
              <>
                <AppAlertButton>View link</AppAlertButton>
                <AppAlertButton variant="outlined">Edit</AppAlertButton>
              </>
            }
          />
          <AppAlert
            severity="info"
            title={shortTitle}
            content={shortContent}
            actions={<AppAlertButton variant="outlined">Button</AppAlertButton>}
          />
          <AppAlert
            severity="info"
            title={shortTitle}
            content={longContent}
            actions={<AppAlertButton>Button</AppAlertButton>}
          />
          <AppAlert
            severity="info"
            title={longTitle}
            content={shortContent}
            actions={<AppAlertButton variant="outlined">Button</AppAlertButton>}
          />
          <AppAlert
            severity="info"
            title={longTitle}
            content={longContent}
            actions={<AppAlertButton>Button</AppAlertButton>}
          />
          <Box />
          <AppTypography variant="h6">With Loading</AppTypography>
          <AppAlert
            severity="info"
            title={longTitle}
            content={longContent}
            actions={<AppAlertButton>Button</AppAlertButton>}
            isLoading
          />
        </Stack>
      </>
    );
  },
};

//
