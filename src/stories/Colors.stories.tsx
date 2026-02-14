import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Box, Typography, useTheme, styled } from '@mui/material';

//
//

const ColorSwatchContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '24px',
  maxWidth: '1200px',
});

const ColorGroupTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3),
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  textTransform: 'capitalize',
}));

const ColorRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
});

const ColorSwatch = styled(Box)<{ bgColor: string; isLight?: boolean }>(({ bgColor, isLight }) => ({
  width: '100px',
  height: '80px',
  backgroundColor: bgColor,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '8px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  color: isLight ? '#0E0217' : '#FFFFFF',
  fontSize: '11px',
  fontFamily: 'monospace',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const SwatchLabel = styled('span')({
  fontWeight: 600,
  marginBottom: '2px',
});

const SwatchHex = styled('span')({
  opacity: 0.8,
  fontSize: '10px',
});

//
//

interface ColorScale {
  [key: string]: string;
}

const isLightColor = (color: string): boolean => {
  let r: number, g: number, b: number;

  // Handle rgba format: rgba(255, 255, 255, 0.8)
  if (color.startsWith('rgba')) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

    if (match) {
      r = parseInt(match[1], 10);
      g = parseInt(match[2], 10);
      b = parseInt(match[3], 10);
    } else {
      return true; // Default to light if parsing fails
    }
  } else {
    // Handle hex format: #FFFFFF
    const hex = color.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5;
};

const ColorScaleDisplay = ({ name, colors }: { name: string; colors: ColorScale }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (shade: string, hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedKey(shade);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <Box>
      <ColorGroupTitle>{name}</ColorGroupTitle>
      <ColorRow>
        {Object.entries(colors).map(([shade, hex]) => (
          <ColorSwatch
            key={shade}
            bgColor={hex}
            isLight={isLightColor(hex)}
            onClick={() => handleCopy(shade, hex)}
            title={`Click to copy ${hex}`}
          >
            <SwatchLabel>{copiedKey === shade ? 'Copied!' : shade}</SwatchLabel>
            <SwatchHex>{hex}</SwatchHex>
          </ColorSwatch>
        ))}
      </ColorRow>
    </Box>
  );
};

//
//

const ColorsDisplay = () => {
  const theme = useTheme();
  const { colors } = theme.palette;

  const colorScales = [
    { name: 'Primary', colors: colors.primary },
    { name: 'Secondary', colors: colors.secondary },
    { name: 'Neutrals', colors: colors.neutrals },
    { name: 'Green', colors: colors.green },
    { name: 'Blue', colors: colors.blue },
    { name: 'Yellow', colors: colors.yellow },
    { name: 'Orange', colors: colors.orange },
    { name: 'Red', colors: colors.red },
    { name: 'Base', colors: colors.base },
  ];

  return (
    <ColorSwatchContainer>
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Parcel Design System Colors
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Access colors via <code>theme.palette.colors.&#123;colorName&#125;[shade]</code>
        </Typography>
      </Box>

      {colorScales.map(({ name, colors }) => (
        <ColorScaleDisplay key={name} name={name} colors={colors} />
      ))}
    </ColorSwatchContainer>
  );
};

//
//

const meta = {
  title: 'Design System/Colors',
  component: ColorsDisplay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorsDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};
