import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Switch',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Color Variants (Checked)</h3>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <label className="zid-switch zid-switch--primary">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">Primary (Success)</span>
        </label>
        <label className="zid-switch zid-switch--secondary">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">Secondary (Purple)</span>
        </label>
        <label className="zid-switch zid-switch--error">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">Error</span>
        </label>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Switch States</h3>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <label className="zid-switch zid-switch--primary">
          <input type="checkbox" className="zid-switch__input" />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">Off</span>
        </label>
        <label className="zid-switch zid-switch--primary">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">On</span>
        </label>
        <label className="zid-switch zid-switch--primary zid-switch--disabled">
          <input type="checkbox" className="zid-switch__input" disabled />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">Disabled Off</span>
        </label>
        <label className="zid-switch zid-switch--primary zid-switch--disabled">
          <input type="checkbox" className="zid-switch__input" defaultChecked disabled />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
          <span className="zid-switch__label">Disabled On</span>
        </label>
      </div>
    </div>
  ),
};


export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Without Label</h3>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <label className="zid-switch zid-switch--primary">
          <input type="checkbox" className="zid-switch__input" />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
        </label>
        <label className="zid-switch zid-switch--primary">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
        </label>
        <label className="zid-switch zid-switch--secondary">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
        </label>
        <label className="zid-switch zid-switch--error">
          <input type="checkbox" className="zid-switch__input" defaultChecked />
          <span className="zid-switch__track">
            <span className="zid-switch__thumb"></span>
          </span>
        </label>
      </div>
    </div>
  ),
};

export const SettingsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Settings Example</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--zid-divider)' }}>
          <div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontWeight: 500 }}>Email Notifications</div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontSize: '14px', color: 'var(--zid-text-secondary)' }}>Receive email updates about your account</div>
          </div>
          <label className="zid-switch zid-switch--primary">
            <input type="checkbox" className="zid-switch__input" defaultChecked />
            <span className="zid-switch__track">
              <span className="zid-switch__thumb"></span>
            </span>
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--zid-divider)' }}>
          <div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontWeight: 500 }}>Push Notifications</div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontSize: '14px', color: 'var(--zid-text-secondary)' }}>Receive push notifications on your device</div>
          </div>
          <label className="zid-switch zid-switch--primary">
            <input type="checkbox" className="zid-switch__input" />
            <span className="zid-switch__track">
              <span className="zid-switch__thumb"></span>
            </span>
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--zid-divider)' }}>
          <div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontWeight: 500 }}>Dark Mode</div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontSize: '14px', color: 'var(--zid-text-secondary)' }}>Use dark theme for the interface</div>
          </div>
          <label className="zid-switch zid-switch--secondary">
            <input type="checkbox" className="zid-switch__input" defaultChecked />
            <span className="zid-switch__track">
              <span className="zid-switch__thumb"></span>
            </span>
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--zid-divider)' }}>
          <div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontWeight: 500, color: 'var(--zid-text-disabled)' }}>Beta Features</div>
            <div style={{ fontFamily: 'var(--zid-font-family)', fontSize: '14px', color: 'var(--zid-text-disabled)' }}>Not available for your account</div>
          </div>
          <label className="zid-switch zid-switch--primary zid-switch--disabled">
            <input type="checkbox" className="zid-switch__input" disabled />
            <span className="zid-switch__track">
              <span className="zid-switch__thumb"></span>
            </span>
          </label>
        </div>
      </div>
    </div>
  ),
};
