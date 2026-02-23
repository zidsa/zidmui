import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const indeterminateIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const meta = {
  title: 'CSS Styles/Components/Checkbox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Checkbox States</h3>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <label className="zid-checkbox">
          <input type="checkbox" className="zid-checkbox__input" />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Unchecked</span>
        </label>
        <label className="zid-checkbox">
          <input type="checkbox" className="zid-checkbox__input" defaultChecked />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Checked</span>
        </label>
        <label className="zid-checkbox zid-checkbox--indeterminate">
          <input type="checkbox" className="zid-checkbox__input" />
          <span className="zid-checkbox__box">{indeterminateIcon}</span>
          <span className="zid-checkbox__label">Indeterminate</span>
        </label>
        <label className="zid-checkbox zid-checkbox--disabled">
          <input type="checkbox" className="zid-checkbox__input" disabled />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Disabled</span>
        </label>
        <label className="zid-checkbox zid-checkbox--disabled">
          <input type="checkbox" className="zid-checkbox__input" defaultChecked disabled />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Disabled Checked</span>
        </label>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '300px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Checkbox Group</h3>
      <div className="zid-checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label className="zid-checkbox">
          <input type="checkbox" className="zid-checkbox__input" defaultChecked />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Option 1</span>
        </label>
        <label className="zid-checkbox">
          <input type="checkbox" className="zid-checkbox__input" />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Option 2</span>
        </label>
        <label className="zid-checkbox">
          <input type="checkbox" className="zid-checkbox__input" defaultChecked />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Option 3</span>
        </label>
        <label className="zid-checkbox">
          <input type="checkbox" className="zid-checkbox__input" />
          <span className="zid-checkbox__box">{checkIcon}</span>
          <span className="zid-checkbox__label">Option 4</span>
        </label>
      </div>
    </div>
  ),
};


export const WithHelperText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>With Helper Text</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-checkbox">
            <input type="checkbox" className="zid-checkbox__input" defaultChecked />
            <span className="zid-checkbox__box">{checkIcon}</span>
            <span className="zid-checkbox__label">Email notifications</span>
          </label>
          <div className="zid-input-helper" style={{ marginLeft: '28px' }}>Receive email updates about your account</div>
        </div>
        <div>
          <label className="zid-checkbox">
            <input type="checkbox" className="zid-checkbox__input" />
            <span className="zid-checkbox__box">{checkIcon}</span>
            <span className="zid-checkbox__label">SMS notifications</span>
          </label>
          <div className="zid-input-helper" style={{ marginLeft: '28px' }}>Receive text messages for important updates</div>
        </div>
        <div>
          <label className="zid-checkbox">
            <input type="checkbox" className="zid-checkbox__input" />
            <span className="zid-checkbox__box">{checkIcon}</span>
            <span className="zid-checkbox__label">Accept terms and conditions</span>
          </label>
          <div className="zid-input-helper zid-input-helper--error" style={{ marginLeft: '28px' }}>You must accept the terms to continue</div>
        </div>
      </div>
    </div>
  ),
};

export const ParentChild: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Parent-Child Selection</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="zid-checkbox zid-checkbox--indeterminate">
          <input type="checkbox" className="zid-checkbox__input" />
          <span className="zid-checkbox__box">{indeterminateIcon}</span>
          <span className="zid-checkbox__label" style={{ fontWeight: 500 }}>Select All</span>
        </label>
        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="zid-checkbox">
            <input type="checkbox" className="zid-checkbox__input" defaultChecked />
            <span className="zid-checkbox__box">{checkIcon}</span>
            <span className="zid-checkbox__label">Child option 1</span>
          </label>
          <label className="zid-checkbox">
            <input type="checkbox" className="zid-checkbox__input" defaultChecked />
            <span className="zid-checkbox__box">{checkIcon}</span>
            <span className="zid-checkbox__label">Child option 2</span>
          </label>
          <label className="zid-checkbox">
            <input type="checkbox" className="zid-checkbox__input" />
            <span className="zid-checkbox__box">{checkIcon}</span>
            <span className="zid-checkbox__label">Child option 3</span>
          </label>
        </div>
      </div>
    </div>
  ),
};
