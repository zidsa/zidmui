import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Button',
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
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Contained</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">Primary</button>
          <button className="zid-button zid-button--contained zid-button--secondary zid-button--md">Secondary</button>
          <button className="zid-button zid-button--contained zid-button--error zid-button--md">Error</button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md" disabled>Disabled</button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Outlined</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--outlined zid-button--primary zid-button--md">Primary</button>
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Secondary</button>
          <button className="zid-button zid-button--outlined zid-button--error zid-button--md">Error</button>
          <button className="zid-button zid-button--outlined zid-button--primary zid-button--md" disabled>Disabled</button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Text</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--text zid-button--primary zid-button--md">Primary</button>
          <button className="zid-button zid-button--text zid-button--secondary zid-button--md">Secondary</button>
          <button className="zid-button zid-button--text zid-button--error zid-button--md">Error</button>
          <button className="zid-button zid-button--text zid-button--primary zid-button--md" disabled>Disabled</button>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Contained Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--sm">Small</button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">Medium</button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--lg">Large</button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Outlined Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--outlined zid-button--primary zid-button--sm">Small</button>
          <button className="zid-button zid-button--outlined zid-button--primary zid-button--md">Medium</button>
          <button className="zid-button zid-button--outlined zid-button--primary zid-button--lg">Large</button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Text Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--text zid-button--primary zid-button--sm">Small</button>
          <button className="zid-button zid-button--text zid-button--primary zid-button--md">Medium</button>
          <button className="zid-button zid-button--text zid-button--primary zid-button--lg">Large</button>
        </div>
      </div>
    </div>
  ),
};


export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Interactive States (hover to see)</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">Default</button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md" disabled>Disabled</button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>All Colors - Disabled State</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md" disabled>Primary</button>
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md" disabled>Secondary</button>
          <button className="zid-button zid-button--text zid-button--error zid-button--md" disabled>Error</button>
        </div>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Full Width Buttons</h3>
      <button className="zid-button zid-button--contained zid-button--primary zid-button--md zid-button--full-width">
        Full Width Primary
      </button>
      <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md zid-button--full-width">
        Full Width Secondary
      </button>
      <button className="zid-button zid-button--text zid-button--error zid-button--md zid-button--full-width">
        Full Width Error
      </button>
    </div>
  ),
};

export const IconButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Icon Only Buttons</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--sm zid-button--icon-only">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md zid-button--icon-only">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--lg zid-button--icon-only">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Buttons with Icons</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Add Item
          </button>
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit
          </button>
          <button className="zid-button zid-button--text zid-button--error zid-button--md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  ),
};
