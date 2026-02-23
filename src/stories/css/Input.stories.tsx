import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Input',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Input Sizes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-input-label">Small</label>
          <div className="zid-input zid-input--sm">
            <input type="text" className="zid-input__field" placeholder="Small input" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Medium</label>
          <div className="zid-input zid-input--md">
            <input type="text" className="zid-input__field" placeholder="Medium input" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Large</label>
          <div className="zid-input zid-input--lg">
            <input type="text" className="zid-input__field" placeholder="Large input" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Input States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-input-label">Default</label>
          <div className="zid-input zid-input--md">
            <input type="text" className="zid-input__field" placeholder="Default state" />
          </div>
          <div className="zid-input-helper">This is helper text</div>
        </div>
        <div>
          <label className="zid-input-label">Hover (hover over input)</label>
          <div className="zid-input zid-input--md">
            <input type="text" className="zid-input__field" placeholder="Hover to see effect" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Focus (click input)</label>
          <div className="zid-input zid-input--md">
            <input type="text" className="zid-input__field" placeholder="Click to focus" />
          </div>
        </div>
        <div>
          <label className="zid-input-label zid-input-label--required">Error</label>
          <div className="zid-input zid-input--md zid-input--error">
            <input type="text" className="zid-input__field" placeholder="Error state" />
          </div>
          <div className="zid-input-helper zid-input-helper--error">This field has an error</div>
        </div>
        <div>
          <label className="zid-input-label">Disabled</label>
          <div className="zid-input zid-input--md zid-input--disabled">
            <input type="text" className="zid-input__field" placeholder="Disabled" disabled />
          </div>
          <div className="zid-input-helper">This input is disabled</div>
        </div>
      </div>
    </div>
  ),
};


export const WithLabelAndHelper: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Label & Helper Text</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="zid-input-label">Email Address</label>
          <div className="zid-input zid-input--md">
            <input type="email" className="zid-input__field" placeholder="Enter your email" />
          </div>
          <div className="zid-input-helper">We will never share your email</div>
        </div>
        <div>
          <label className="zid-input-label zid-input-label--required">Password</label>
          <div className="zid-input zid-input--md">
            <input type="password" className="zid-input__field" placeholder="Enter password" />
          </div>
          <div className="zid-input-helper">Must be at least 8 characters</div>
        </div>
        <div>
          <label className="zid-input-label zid-input-label--required">Username</label>
          <div className="zid-input zid-input--md zid-input--error">
            <input type="text" className="zid-input__field" placeholder="Enter username" defaultValue="ab" />
          </div>
          <div className="zid-input-helper zid-input-helper--error">Username must be at least 3 characters</div>
        </div>
      </div>
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Adornments</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-input-label">Search</label>
          <div className="zid-input zid-input--md">
            <span className="zid-input__adornment zid-input__adornment--start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </span>
            <input type="text" className="zid-input__field" placeholder="Search..." />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Price</label>
          <div className="zid-input zid-input--md">
            <span className="zid-input__adornment zid-input__adornment--start zid-input__adornment-text">$</span>
            <input type="number" className="zid-input__field" placeholder="0.00" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Weight</label>
          <div className="zid-input zid-input--md">
            <input type="number" className="zid-input__field" placeholder="Enter weight" />
            <span className="zid-input__adornment zid-input__adornment--end zid-input__adornment-text">kg</span>
          </div>
        </div>
        <div>
          <label className="zid-input-label">Website</label>
          <div className="zid-input zid-input--md">
            <span className="zid-input__adornment zid-input__adornment--start zid-input__adornment-text">https://</span>
            <input type="text" className="zid-input__field" placeholder="example.com" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Password</label>
          <div className="zid-input zid-input--md">
            <input type="password" className="zid-input__field" placeholder="Enter password" />
            <span className="zid-input__adornment zid-input__adornment--end" style={{ cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Input Types</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-input-label">Text</label>
          <div className="zid-input zid-input--md">
            <input type="text" className="zid-input__field" placeholder="Enter text" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Email</label>
          <div className="zid-input zid-input--md">
            <input type="email" className="zid-input__field" placeholder="email@example.com" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Password</label>
          <div className="zid-input zid-input--md">
            <input type="password" className="zid-input__field" placeholder="Enter password" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Number</label>
          <div className="zid-input zid-input--md">
            <input type="number" className="zid-input__field" placeholder="0" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">Tel</label>
          <div className="zid-input zid-input--md">
            <input type="tel" className="zid-input__field" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
        <div>
          <label className="zid-input-label">URL</label>
          <div className="zid-input zid-input--md">
            <input type="url" className="zid-input__field" placeholder="https://example.com" />
          </div>
        </div>
      </div>
    </div>
  ),
};
