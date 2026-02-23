import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Radio',
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
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Radio States</h3>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <label className="zid-radio">
          <input type="radio" className="zid-radio__input" name="state-demo" />
          <span className="zid-radio__circle"></span>
          <span className="zid-radio__label">Unchecked</span>
        </label>
        <label className="zid-radio">
          <input type="radio" className="zid-radio__input" name="state-demo" defaultChecked />
          <span className="zid-radio__circle"></span>
          <span className="zid-radio__label">Checked</span>
        </label>
        <label className="zid-radio zid-radio--disabled">
          <input type="radio" className="zid-radio__input" name="state-demo-2" disabled />
          <span className="zid-radio__circle"></span>
          <span className="zid-radio__label">Disabled</span>
        </label>
        <label className="zid-radio zid-radio--disabled">
          <input type="radio" className="zid-radio__input" name="state-demo-3" defaultChecked disabled />
          <span className="zid-radio__circle"></span>
          <span className="zid-radio__label">Disabled Checked</span>
        </label>
      </div>
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '300px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Radio Group - Vertical</h3>
        <div className="zid-radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="group-demo" defaultChecked />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Option 1</span>
          </label>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="group-demo" />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Option 2</span>
          </label>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="group-demo" />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Option 3</span>
          </label>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Radio Group - Horizontal</h3>
        <div className="zid-radio-group" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="group-demo-h" defaultChecked />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Small</span>
          </label>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="group-demo-h" />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Medium</span>
          </label>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="group-demo-h" />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Large</span>
          </label>
        </div>
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
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="helper-demo" defaultChecked />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Standard Shipping</span>
          </label>
          <div className="zid-input-helper" style={{ marginLeft: '28px' }}>Free delivery in 5-7 business days</div>
        </div>
        <div>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="helper-demo" />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Express Shipping</span>
          </label>
          <div className="zid-input-helper" style={{ marginLeft: '28px' }}>$9.99 - Delivery in 2-3 business days</div>
        </div>
        <div>
          <label className="zid-radio">
            <input type="radio" className="zid-radio__input" name="helper-demo" />
            <span className="zid-radio__circle"></span>
            <span className="zid-radio__label">Priority Shipping</span>
          </label>
          <div className="zid-input-helper" style={{ marginLeft: '28px' }}>$19.99 - Next day delivery</div>
        </div>
      </div>
    </div>
  ),
};
