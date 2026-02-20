import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';
import { IconCloseLine } from '~/icons/system/close-line';

//
//

const icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
};

// Meta
const meta = {
  title: 'CSS Styles/Components/Alert',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

//

export const WithTitle: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3
          style={{
            marginBottom: '8px',
            fontFamily: 'var(--zid-font-family)',
          }}
        >
          Alerts with Title
        </h3>

        <div className="zid-alert zid-alert--success">
          <div className="zid-alert__icon">{icons.success}</div>
          <div className="zid-alert__content">
            <div className="zid-alert__title">Success</div>
            <div className="zid-alert__message">Your order has been placed successfully.</div>
          </div>
          <button className="zid-alert__close" aria-label="Close">
            <IconCloseLine />
          </button>
        </div>

        <div className="zid-alert zid-alert--info">
          <div className="zid-alert__icon">{icons.info}</div>
          <div className="zid-alert__content">
            <div className="zid-alert__title">Information</div>
            <div className="zid-alert__message">
              This alert has a title and a message for more context.
            </div>
          </div>
          <button className="zid-alert__close" aria-label="Close">
            <IconCloseLine />
          </button>
        </div>

        <div className="zid-alert zid-alert--warning">
          <div className="zid-alert__icon">{icons.warning}</div>
          <div className="zid-alert__content">
            <div className="zid-alert__title">Warning</div>
            <div className="zid-alert__message">Your session will expire in 5 minutes.</div>
          </div>
          <button className="zid-alert__close" aria-label="Close">
            <IconCloseLine />
          </button>
        </div>

        <div className="zid-alert zid-alert--error">
          <div className="zid-alert__icon">{icons.error}</div>
          <div className="zid-alert__content">
            <div className="zid-alert__title">Error</div>
            <div className="zid-alert__message">Failed to save changes. Please try again.</div>
          </div>
          <button className="zid-alert__close" aria-label="Close">
            <IconCloseLine />
          </button>
        </div>
      </div>
    );
  },
};
