import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { StackColumn } from '~/components/stack-column';
import { StackRow } from '~/components/stack-row';
import { AppTooltip } from '~/components/app-tooltip';
import { IconFileCopyLine } from '~/icons/document/file-copy-line';
import { IconCheckLine } from '~/icons/system/check-line';
import { AppTypography } from '~/components/app-typography';

//
//

const meta = {
  title: 'Design System/Spacing',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ color = '#1976d2' }: { color?: string }) => (
  <Box
    sx={{
      width: 60,
      height: 60,
      backgroundColor: color,
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
    }}
  >
    Box
  </Box>
);

const CopyButton = ({ value }: { value: number | string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`gap={${value}}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppTooltip description={copied ? 'Copied!' : 'Copy'}>
      <IconButton size="small" onClick={handleCopy}>
        {copied ? <IconCheckLine fontSize="small" /> : <IconFileCopyLine fontSize="small" />}
      </IconButton>
    </AppTooltip>
  );
};

const spacingValues = [
  1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5,
];

export const StackRowSpacing: Story = {
  render: () => (
    <StackColumn gap={3}>
      {spacingValues.map(spacing => (
        <StackColumn key={`row-${spacing}`} gap={0.75}>
          <StackRow gap={0}>
            <AppTypography variant="subtitle1" minWidth={60}>
              Gap: {spacing}
            </AppTypography>
            <CopyButton value={spacing} />
          </StackRow>

          <StackRow gap={spacing}>
            <DemoBox />
            <DemoBox />
            <DemoBox />
            <DemoBox />
          </StackRow>
        </StackColumn>
      ))}
    </StackColumn>
  ),
};

export const StackColumnSpacing: Story = {
  render: () => (
    <StackColumn gap={3}>
      {spacingValues.map(spacing => (
        <StackColumn key={`col-${spacing}`} gap={0.75}>
          <StackRow gap={0}>
            <AppTypography variant="subtitle1" minWidth={60}>
              Gap: {spacing}
            </AppTypography>
            <CopyButton value={spacing} />
          </StackRow>
          <StackColumn gap={spacing}>
            <DemoBox color="#dc3545" />
            <DemoBox color="#dc3545" />
            <DemoBox color="#dc3545" />
            <DemoBox color="#dc3545" />
          </StackColumn>
        </StackColumn>
      ))}
    </StackColumn>
  ),
};
