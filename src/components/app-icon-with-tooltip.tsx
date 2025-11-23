import { Box, Tooltip, TooltipProps, SvgIconOwnProps, styled } from '@mui/material';

import { IconInformationLine } from '../icons/system/information-line';

import { StackRow } from './stack-row';

//
//

// NOTE: accessibleAreaWidth and accessibleAreaHeight are used to create non-visible area for
//       the tooltip to be accessible on mobile

type AppIconWithTooltipProps = Omit<TooltipProps, 'children'> & {
  accessibleAreaWidth?: string;
  accessibleAreaHeight?: string;
  icon?: React.ReactNode;
  iconProps?: SvgIconOwnProps;
};

export const AppIconWithTooltip: React.FC<AppIconWithTooltipProps> = ({
  title,
  accessibleAreaWidth = '36px',
  accessibleAreaHeight = '36px',
  icon,
  iconProps,
  ...props
}) => {
  return (
    <Tooltip title={title} placement="top" {...props}>
      <StackRow position="relative" alignItems="center" justifyContent="center">
        {icon ?? <IconInformationLine fontSize="inherit" color="action" {...iconProps} />}
        <TooltipArea width={accessibleAreaWidth} height={accessibleAreaHeight} />
      </StackRow>
    </Tooltip>
  );
};

const TooltipArea = styled(Box)(({ width, height }) => ({
  position: 'absolute',
  display: 'none',
  pointerEvents: 'none',
  '@media (pointer:none), (pointer:coarse), (hover:none)': {
    display: 'block',
    width: width || '24px',
    height: height || '24px',
    pointerEvents: 'auto',
  },
}));
