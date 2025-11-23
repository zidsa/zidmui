import { useState } from 'react';

import { styled, Tooltip, TooltipProps } from '@mui/material';

import { AppTypographyProps, AppTypography } from './app-typography';

//
//

export type AppOverflownTextWithTooltipProps = Omit<TooltipProps, 'title' | 'children'> & {
  title: string;
  typographyProps?: AppTypographyProps;
  twoLines?: boolean;
};

export const AppOverflownTextWithTooltip: React.FC<AppOverflownTextWithTooltipProps> = ({
  title,
  typographyProps,
  twoLines,
  ...props
}) => {
  const [isOverflown, setIsOverflown] = useState(false);

  const checkIsOverflown = (element: HTMLElement) => {
    if (!element) return;
    setIsOverflown(
      element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight,
    );
  };

  const checkIsOverflownTwoLines = (element: HTMLElement) => {
    if (!element) return;

    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight || '0');

    const maxHeight = lineHeight * 2;
    const actualHeight = element.scrollHeight;

    setIsOverflown(actualHeight > maxHeight + 1); // +1 for rounding
  };

  return (
    <Tooltip title={isOverflown ? title : undefined} placement="top" {...props}>
      <Typography
        onMouseEnter={e =>
          twoLines ? checkIsOverflownTwoLines(e.currentTarget) : checkIsOverflown(e.currentTarget)
        }
        data-two-lines={`${twoLines}`}
        {...typographyProps}
      >
        {title}
      </Typography>
    </Tooltip>
  );
};

//

const Typography = styled(AppTypography)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '::first-letter': { textTransform: 'capitalize' },

  '&[data-two-lines="true"]': {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
  },
}));
