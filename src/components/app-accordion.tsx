import React from 'react';

import { AppTypography } from '../components/app-typography';
import type { AppTypographyProps } from '../components/app-typography';
import { IconArrowDownSLine } from '../icons/arrows/arrow-down-s-line';

import Accordion from '@mui/material/Accordion';
import type { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import type { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

//
//

export type AppAccordionColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export type AppAccordionProps = {
  isOpen?: boolean;
  color?: AppAccordionColor;
  onToggle?: (event: React.SyntheticEvent, expanded: boolean) => void;
  titleProps?: AppTypographyProps;
  title?: string | React.ReactNode;
  accordionProps?: Partial<AccordionProps>;
  accordionSummaryProps?: Partial<AccordionSummaryProps>;
  unmountOnExit?: boolean;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  children?: React.ReactNode;
  preContent?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  loading?: boolean;
  loaderProps?: StackProps;
  loaderSize?: CircularProgressProps['size'];
  disable?: boolean;
};

export const AppAccordion: React.FC<AppAccordionProps> = ({
  isOpen,
  color,
  onToggle,
  accordionProps,
  title,
  description,
  accordionSummaryProps,
  titleProps,
  children,
  unmountOnExit = true,
}) => {
  return (
    <Accordion
      expanded={isOpen}
      onChange={onToggle}
      slotProps={{ transition: { unmountOnExit } }}
      color={color}
      {...accordionProps}
    >
      <AccordionSummary
        expandIcon={<IconArrowDownSLine />}
        sx={{
          '& .MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded': {
            m: 0,
            py: 2,
          },
        }}
        {...accordionSummaryProps}
      >
        <AppAccordionSummary title={title} description={description} titleProps={titleProps} />
      </AccordionSummary>

      <AccordionDetails sx={{ p: 0 }}>
        <AppCardAccordionContent>{children}</AppCardAccordionContent>
      </AccordionDetails>
    </Accordion>
  );
};

//

type AppCardSummaryProps = {
  title?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  titleProps?: AppTypographyProps;
  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;
  disable?: boolean;
};

const AppAccordionSummary: React.FC<AppCardSummaryProps> = ({
  title,
  titleSuffix,
  titleProps,
  description,
  descriptionProps,
  disable,
}) => {
  return (
    <Stack spacing={0} gap={0} width="100%">
      {typeof title === 'string' ? (
        <AppTypography
          variant="h6"
          display="flex"
          alignItems="center"
          color={disable ? 'text.tertiary' : 'text.primary'}
          gap={1}
          {...titleProps}
        >
          {title} {titleSuffix ? titleSuffix : null}
        </AppTypography>
      ) : (
        title
      )}

      {description && (
        <AppTypography
          variant="body2"
          color={disable ? 'text.disabled' : 'text.tertiary'}
          whiteSpace="pre-line"
          {...descriptionProps}
        >
          {description}
        </AppTypography>
      )}
    </Stack>
  );
};

//

const AppCardAccordionContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingInline: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(0),
}));
