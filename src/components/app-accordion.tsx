import React from 'react';

import { AppTypography, type AppTypographyProps } from './app-typography';
import { IconArrowDownSLine } from '../icons/arrows/arrow-down-s-line';

import {
  Accordion,
  type AccordionProps,
  AccordionDetails,
  AccordionSummary,
  type AccordionSummaryProps,
  type Theme,
  SxProps,
  Box,
  AccordionDetailsProps,
} from '@mui/material';
import { StackRow, type StackRowProps } from './stack-row';
import { StackColumn } from './stack-column';

import ZidLogoSpinner from '../logos/zid/zid-logo-spinner.svg';

//
//

export type AppAccordionColor = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export type AppAccordionRoundedCorners = 'grouped' | 'all';

export type AppAccordionProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (event: React.SyntheticEvent, expanded: boolean) => void;
  color?: AppAccordionColor;
  disable?: boolean;

  roundedCorners?: AppAccordionRoundedCorners;

  accordionProps?: Partial<AccordionProps>;
  accordionSummaryProps?: Partial<AccordionSummaryProps>;

  unmountOnExit?: boolean;

  title?: string | React.ReactNode;
  titleProps?: AppTypographyProps;
  titlePrefix?: React.ReactNode;
  titleSuffix?: React.ReactNode;

  description?: React.ReactNode;
  descriptionProps?: AppTypographyProps;

  isSummaryLoading?: boolean;
  summaryLoader?: React.ReactNode;
  summaryLoaderProps?: StackRowProps;

  isDetailsLoading?: boolean;
  detailsProps?: AccordionDetailsProps;
  detailsLoader?: React.ReactNode;
  detailsLoaderProps?: StackRowProps;

  sx?: SxProps<Theme>;
};

export const AppAccordion: React.FC<AppAccordionProps> = ({
  isOpen,
  color,
  onToggle,
  accordionProps,
  title,
  description,
  descriptionProps,
  accordionSummaryProps,
  titleProps,
  titleSuffix,
  titlePrefix,
  children,
  unmountOnExit = true,
  isSummaryLoading,
  summaryLoader,
  summaryLoaderProps,
  isDetailsLoading,
  detailsLoader,
  detailsProps,
  detailsLoaderProps,
  disable,
  roundedCorners = 'all',
}) => {
  // Determine if controlled or uncontrolled mode
  const expandedProp = isOpen !== undefined ? { expanded: isOpen } : {};

  // Default loader component
  const defaultSummaryLoader = <Box component="img" src={ZidLogoSpinner} sx={{ width: 24 }} />;
  const defaultDetailsLoader = <Box component="img" src={ZidLogoSpinner} sx={{ width: 56 }} />;

  // Determine which loader to show
  const summaryLoaderContent = isSummaryLoading
    ? summaryLoader === undefined
      ? defaultSummaryLoader
      : summaryLoader
    : null;

  const detailsLoaderContent = isDetailsLoading
    ? detailsLoader === undefined
      ? defaultDetailsLoader
      : detailsLoader
    : null;

  return (
    <Accordion
      onChange={onToggle}
      disabled={disable}
      slotProps={{ transition: { unmountOnExit } }}
      data-rounded-corners={roundedCorners}
      data-color={color}
      color={color}
      {...expandedProp}
      {...accordionProps}
    >
      {/* Summary */}
      <AccordionSummary
        expandIcon={summaryLoaderContent ? undefined : <IconArrowDownSLine />}
        {...accordionSummaryProps}
      >
        <StackRow alignItems="center" gap={1} width="100%">
          {titlePrefix}

          <StackColumn gap={0.25} width="100%">
            {typeof title === 'string' ? (
              <AppTypography
                variant="subtitle1"
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
          </StackColumn>

          {summaryLoaderContent && (
            <StackRow alignItems="center" justifyContent="center" {...summaryLoaderProps}>
              {summaryLoaderContent}
            </StackRow>
          )}
        </StackRow>
      </AccordionSummary>

      {/* Details */}
      <AccordionDetails {...detailsProps}>
        {detailsLoaderContent ? (
          <StackRow alignItems="center" justifyContent="center" {...detailsLoaderProps}>
            {detailsLoaderContent}
          </StackRow>
        ) : (
          children
        )}
      </AccordionDetails>
    </Accordion>
  );
};
