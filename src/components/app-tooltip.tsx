import { styled, Tooltip, TooltipProps, Typography, TypographyProps } from '@mui/material';

import { StackColumn } from './stack-column';

//
//

export type AppTooltipTitleProps = {
  headline?: React.ReactNode;
  headLintProps?: TypographyProps;
  description?: React.ReactNode;
  descriptionProps?: TypographyProps;
  content?: React.ReactNode;
  contentProps?: TypographyProps;
  disable?: boolean;
};

export type AppTooltipProps = Omit<TooltipProps, 'title' | 'content'> & AppTooltipTitleProps;

export const AppTooltip = ({
  children,
  headline,
  headLintProps,
  description,
  descriptionProps,
  content,
  contentProps,
  disable,
  ...props
}: AppTooltipProps) => {
  return (
    <Tooltip
      arrow
      placement="top"
      disableInteractive
      enterDelay={500}
      slotProps={{
        popper: { modifiers: [{ name: 'offset', options: { offset: [0, -4] } }] },
      }}
      title={
        disable ? undefined : (
          <AppTooltipTitle
            headline={headline}
            headLintProps={headLintProps}
            description={description}
            descriptionProps={descriptionProps}
            content={content}
            contentProps={contentProps}
          />
        )
      }
      {...props}
    >
      {children}
    </Tooltip>
  );
};

const AppTooltipTitle = ({
  headline,
  headLintProps,
  description,
  descriptionProps,
  content,
  contentProps,
}: AppTooltipTitleProps) => {
  const headlineElem =
    typeof headline === 'string' ? (
      <HeadlineTypography {...headLintProps}>{headline}</HeadlineTypography>
    ) : (
      headline
    );

  //

  const descriptionElem =
    typeof description === 'string' ? (
      <DescriptionTypography {...descriptionProps}>{description}</DescriptionTypography>
    ) : (
      description
    );

  //

  const contentElem =
    typeof content === 'string' ? (
      <DescriptionTypography {...contentProps}>{content}</DescriptionTypography>
    ) : (
      content
    );

  //

  return (
    <StackColumn gap={1.5}>
      <StackColumn gap={0.25}>
        {headlineElem}
        {descriptionElem}
      </StackColumn>
      {contentElem}
    </StackColumn>
  );
};

//

const HeadlineTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.neutral[50],
  lineHeight: theme.spacing(2.5),
  fontWeight: 600,
  fontSize: theme.spacing(1.625),
}));

const DescriptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.neutral[50],
  fontWeight: 400,
  fontSize: theme.spacing(1.5),
}));
