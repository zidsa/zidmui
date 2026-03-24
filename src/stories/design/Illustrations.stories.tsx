import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Box, styled } from '@mui/material';
import { AppTypography } from '~/components/app-typography';

//
//

const svgModules = import.meta.glob('../../illustrations/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const illustrations = Object.entries(svgModules)
  .map(([path, url]) => ({
    name: path.replace('../../illustrations/', '').replace('.svg', ''),
    url,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

//
//

const Grid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '16px',
  padding: '24px',
});

const Card = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '320px',
  gap: '8px',
  padding: '16px',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s ease',
  '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
});

//
//

const IllustrationsDisplay = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Box>
      <Box sx={{ p: 3, pb: 0 }}>
        <AppTypography variant="h4" sx={{ mb: 1 }}>
          Illustrations
        </AppTypography>
        <AppTypography variant="body2" color="text.secondary">
          {illustrations.length} illustrations — click to copy name
        </AppTypography>
      </Box>
      <Grid>
        {illustrations.map(({ name, url }) => (
          <Card key={name} onClick={() => handleCopy(name)} title={`Click to copy: ${name}`}>
            <img
              src={url}
              alt={name}
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />
            <AppTypography
              variant="caption"
              align="center"
              sx={{ wordBreak: 'break-all', lineHeight: 1.3 }}
            >
              {copied === name ? '✓ Copied!' : name}
            </AppTypography>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

//
//

const meta = {
  title: 'Design System/Illustrations',
  component: IllustrationsDisplay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IllustrationsDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIllustrations: Story = {};
