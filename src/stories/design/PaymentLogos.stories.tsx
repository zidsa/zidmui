import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Box, styled } from '@mui/material';
import { AppTypography } from '~/components/app-typography';

//
//

const svgModules = import.meta.glob('../../logos/payments/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const svgRaw = import.meta.glob('../../logos/payments/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const formatSize = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;

const logos = Object.entries(svgModules)
  .map(([path, url]) => ({
    name: path.replace('../../logos/payments/', '').replace('.svg', ''),
    url,
    size: formatSize(new Blob([svgRaw[path] ?? '']).size),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

//
//

const Grid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '16px',
  padding: '24px',
});

const Card = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
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

const PaymentLogosDisplay = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (name: string) => {
    await navigator.clipboard.writeText(`@zidsa/zidmui/logos/payments/${name}.svg`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Box>
      <Box sx={{ p: 3, pb: 0 }}>
        <AppTypography variant="h4" sx={{ mb: 1 }}>
          Payment Logos
        </AppTypography>
        <AppTypography variant="body2" color="text.secondary">
          {logos.length} payment logos — click to copy name
        </AppTypography>
      </Box>
      <Grid>
        {logos.map(({ name, url, size }) => (
          <Card key={name} onClick={() => handleCopy(name)} title={`Click to copy: ${name}`}>
            <img
              src={url}
              alt={name}
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />
            <AppTypography align="center" sx={{ wordBreak: 'break-all', lineHeight: 1.3 }}>
              {copied === name ? '✓ Copied!' : name}
            </AppTypography>
            <AppTypography variant="caption" color="text.disabled">
              {size}
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
  title: 'Design System/Payment Logos',
  component: PaymentLogosDisplay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentLogosDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPaymentLogos: Story = {};
