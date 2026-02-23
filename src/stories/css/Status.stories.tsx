import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Status',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Color Variants</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span className="zid-status zid-status--success zid-status--md">Success</span>
          <span className="zid-status zid-status--error zid-status--md">Error</span>
          <span className="zid-status zid-status--warning zid-status--md">Warning</span>
          <span className="zid-status zid-status--info zid-status--md">Info</span>
          <span className="zid-status zid-status--neutral zid-status--md">Neutral</span>
          <span className="zid-status zid-status--disabled zid-status--md">Disabled</span>
          <span className="zid-status zid-status--orange zid-status--md">Orange</span>
          <span className="zid-status zid-status--blue zid-status--md">Blue</span>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span className="zid-status zid-status--success zid-status--sm">Small</span>
          <span className="zid-status zid-status--success zid-status--md">Medium</span>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Dot</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span className="zid-status zid-status--success zid-status--md">
            <span className="zid-status__dot"></span>Active
          </span>
          <span className="zid-status zid-status--error zid-status--md">
            <span className="zid-status__dot"></span>Inactive
          </span>
          <span className="zid-status zid-status--warning zid-status--md">
            <span className="zid-status__dot"></span>Pending
          </span>
          <span className="zid-status zid-status--neutral zid-status--md">
            <span className="zid-status__dot"></span>Draft
          </span>
        </div>
      </div>
    </div>
  ),
};
