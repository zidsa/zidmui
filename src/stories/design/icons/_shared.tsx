import { useState, useMemo, type ComponentType, type SVGProps } from 'react';
import { Box, styled, TextField, InputAdornment } from '@mui/material';
import { AppTypography } from '~/components/app-typography';

//
//

type IconModule = Record<string, unknown>;

export type IconInfo = {
  name: string;
  exportName: string;
  fileName: string;
  category: string;
  Component: ComponentType<SVGProps<SVGSVGElement>>;
};

export const getIconsFromModule = (
  modules: Record<string, IconModule>,
  categoryPath: string,
): IconInfo[] => {
  return Object.entries(modules)
    .map(([path, module]) => {
      const fileName = path.split('/').pop()?.replace('.tsx', '') ?? '';
      const exportName = Object.keys(module).find(key => key.startsWith('Icon')) ?? '';
      const Component = module[exportName] as ComponentType<SVGProps<SVGSVGElement>>;

      if (!Component) return null;

      return {
        name: fileName,
        exportName,
        fileName,
        category: categoryPath,
        Component,
      };
    })
    .filter((icon): icon is IconInfo => icon !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
};

//
//

const Container = styled(Box)({
  padding: '24px',
});

const SearchBox = styled(Box)({
  position: 'sticky',
  top: 0,
  backgroundColor: 'var(--sb-background, #fff)',
  zIndex: 10,
  paddingBottom: '16px',
});

const Grid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: '12px',
});

const Card = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '120px',
  gap: '8px',
  padding: '12px 8px',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    borderColor: 'rgba(0,0,0,0.2)',
  },
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  '& svg': {
    width: '24px',
    height: '24px',
  },
});

//
//

type IconsDisplayProps = {
  icons: IconInfo[];
  categoryName: string;
};

export const IconsDisplay = ({ icons, categoryName }: IconsDisplayProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredIcons = useMemo(() => {
    if (!search.trim()) return icons;

    const searchLower = search.toLowerCase();
    return icons.filter(
      icon =>
        icon.name.toLowerCase().includes(searchLower) ||
        icon.exportName.toLowerCase().includes(searchLower),
    );
  }, [icons, search]);

  const handleCopy = async (icon: IconInfo) => {
    const importPath = `@zidsa/zidmui/icons/${icon.category}/${icon.fileName}`;
    await navigator.clipboard.writeText(importPath);
    setCopied(icon.exportName);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Container>
      <SearchBox>
        <AppTypography variant="h4" sx={{ mb: 1 }}>
          {categoryName}
        </AppTypography>
        <AppTypography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {icons.length} icons — click to copy import
        </AppTypography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search icons..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ fontSize: '18px' }}>
                  🔍
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
        {search && (
          <AppTypography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Found {filteredIcons.length} icons
          </AppTypography>
        )}
      </SearchBox>

      <Grid>
        {filteredIcons.map(icon => (
          <Card
            key={icon.exportName}
            onClick={() => handleCopy(icon)}
            title={`Click to copy: ${icon.exportName}`}
          >
            <IconWrapper>
              <icon.Component />
            </IconWrapper>
            <AppTypography
              variant="caption"
              align="center"
              sx={{
                wordBreak: 'break-word',
                lineHeight: 1.3,
                fontSize: '11px',
                maxWidth: '100%',
              }}
            >
              {copied === icon.exportName ? '✓ Copied!' : `${icon.category}/${icon.name}`}
            </AppTypography>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
