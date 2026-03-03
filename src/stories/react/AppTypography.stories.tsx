import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppTypography } from '~/components/app-typography';
import { StackColumn } from '~/components/stack-column';

//
//

// Meta
const meta = {
  title: 'React/App Typography',
  component: AppTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    tooltip: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AppTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

//

export const Default: Story = {
  args: {
    children: 'Default typography text',
  },
};

//

export const Headings: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2}>
      <AppTypography variant="h1">Heading 1</AppTypography>
      <AppTypography variant="h2">Heading 2</AppTypography>
      <AppTypography variant="h3">Heading 3</AppTypography>
      <AppTypography variant="h4">Heading 4</AppTypography>
      <AppTypography variant="h5">Heading 5</AppTypography>
      <AppTypography variant="h6">Heading 6</AppTypography>
    </StackColumn>
  ),
};

//

export const BodyText: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2}>
      <AppTypography variant="body1">Body 1 - Regular body text</AppTypography>
      <AppTypography variant="body2">Body 2 - Smaller body text</AppTypography>
      <AppTypography variant="subtitle1">Subtitle 1</AppTypography>
      <AppTypography variant="subtitle2">Subtitle 2</AppTypography>
      <AppTypography variant="caption">Caption text</AppTypography>
      <AppTypography variant="overline">Overline text</AppTypography>
    </StackColumn>
  ),
};

//

export const WithTooltip: Story = {
  args: {
    children: 'Hover over me to see the tooltip',
    tooltip: 'This is a helpful tooltip message',
  },
};

//

export const Colors: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2}>
      <AppTypography color="primary">Primary color</AppTypography>
      <AppTypography color="secondary">Secondary color</AppTypography>
      <AppTypography color="textPrimary">Text Primary</AppTypography>
      <AppTypography color="textSecondary">Text Secondary</AppTypography>
      <AppTypography color="error">Error color</AppTypography>
    </StackColumn>
  ),
};

//

export const Alignment: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2} sx={{ width: 300 }}>
      <AppTypography align="left">Left aligned text</AppTypography>
      <AppTypography align="center">Center aligned text</AppTypography>
      <AppTypography align="right">Right aligned text</AppTypography>
    </StackColumn>
  ),
};

//

export const ArabicHeadings: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2} dir="rtl">
      <AppTypography variant="h1">العنوان الأول</AppTypography>
      <AppTypography variant="h2">العنوان الثاني</AppTypography>
      <AppTypography variant="h3">العنوان الثالث</AppTypography>
      <AppTypography variant="h4">العنوان الرابع</AppTypography>
      <AppTypography variant="h5">العنوان الخامس</AppTypography>
      <AppTypography variant="h6">العنوان السادس</AppTypography>
    </StackColumn>
  ),
};

//

export const ArabicBodyText: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2} dir="rtl">
      <AppTypography variant="body1">النص الأساسي - هذا مثال على النص العربي</AppTypography>
      <AppTypography variant="body2">النص الثانوي - نص أصغر حجماً</AppTypography>
      <AppTypography variant="subtitle1">العنوان الفرعي الأول</AppTypography>
      <AppTypography variant="subtitle2">العنوان الفرعي الثاني</AppTypography>
      <AppTypography variant="caption">نص توضيحي صغير</AppTypography>
      <AppTypography variant="overline">نص علوي</AppTypography>
    </StackColumn>
  ),
};

//

export const ArabicWithTooltip: Story = {
  args: {
    children: 'مرر الماوس هنا لرؤية التلميح',
    tooltip: 'هذه رسالة تلميح مفيدة',
  },
};

//

export const ArabicParagraph: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={2} dir="rtl" sx={{ maxWidth: 500 }}>
      <AppTypography variant="h4">مرحباً بك في منصتنا</AppTypography>
      <AppTypography variant="body1">
        نحن نقدم لك أفضل الحلول التقنية لإدارة متجرك الإلكتروني. ابدأ رحلتك معنا اليوم واكتشف كيف
        يمكننا مساعدتك في تحقيق أهدافك التجارية.
      </AppTypography>
      <AppTypography variant="body2" color="textSecondary">
        للمزيد من المعلومات، تواصل مع فريق الدعم الفني.
      </AppTypography>
    </StackColumn>
  ),
};

//

export const MixedContent: Story = {
  args: {
    children: null,
  },
  render: () => (
    <StackColumn gap={3}>
      <StackColumn gap={1}>
        <AppTypography variant="h5">English Title</AppTypography>
        <AppTypography variant="body1">This is English content for comparison.</AppTypography>
      </StackColumn>
      <StackColumn gap={1} dir="rtl">
        <AppTypography variant="h5">عنوان عربي</AppTypography>
        <AppTypography variant="body1">هذا محتوى عربي للمقارنة.</AppTypography>
      </StackColumn>
    </StackColumn>
  ),
};
