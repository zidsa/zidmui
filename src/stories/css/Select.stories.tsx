import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Select',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Select Sizes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-input-label">Small</label>
          <div className="zid-select zid-select--sm">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Small select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
        </div>
        <div>
          <label className="zid-input-label">Medium</label>
          <div className="zid-select zid-select--md">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Medium select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
        </div>
        <div>
          <label className="zid-input-label">Large</label>
          <div className="zid-select zid-select--lg">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Large select</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Select States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label className="zid-input-label">Default</label>
          <div className="zid-select zid-select--md">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
          <div className="zid-input-helper">Choose from the list</div>
        </div>
        <div>
          <label className="zid-input-label">With Selection</label>
          <div className="zid-select zid-select--md">
            <select className="zid-select__native" defaultValue="1">
              <option value="" disabled>Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
        </div>
        <div>
          <label className="zid-input-label zid-input-label--required">Error</label>
          <div className="zid-select zid-select--md zid-select--error">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Select an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
          <div className="zid-input-helper zid-input-helper--error">Please select an option</div>
        </div>
        <div>
          <label className="zid-input-label">Disabled</label>
          <div className="zid-select zid-select--md zid-select--disabled">
            <select className="zid-select__native" disabled defaultValue="">
              <option value="" disabled>Disabled</option>
              <option value="1">Option 1</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
          <div className="zid-input-helper">This select is disabled</div>
        </div>
      </div>
    </div>
  ),
};


export const WithLabelAndHelper: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Label & Helper</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="zid-input-label">Country</label>
          <div className="zid-select zid-select--md">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Select country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
          <div className="zid-input-helper">Select your country of residence</div>
        </div>
        <div>
          <label className="zid-input-label zid-input-label--required">Category</label>
          <div className="zid-select zid-select--md">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food & Beverages</option>
              <option value="home">Home & Garden</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
          <div className="zid-input-helper">Required for product listing</div>
        </div>
        <div>
          <label className="zid-input-label zid-input-label--required">Priority</label>
          <div className="zid-select zid-select--md zid-select--error">
            <select className="zid-select__native" defaultValue="">
              <option value="" disabled>Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <span className="zid-select__icon">▼</span>
          </div>
          <div className="zid-input-helper zid-input-helper--error">Priority is required</div>
        </div>
      </div>
    </div>
  ),
};

export const WithOptgroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>With Option Groups</h3>
      <div>
        <label className="zid-input-label">Product Category</label>
        <div className="zid-select zid-select--md">
          <select className="zid-select__native" defaultValue="">
            <option value="" disabled>Select category</option>
            <optgroup label="Electronics">
              <option value="phones">Phones</option>
              <option value="laptops">Laptops</option>
              <option value="tablets">Tablets</option>
            </optgroup>
            <optgroup label="Clothing">
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
            </optgroup>
            <optgroup label="Home">
              <option value="furniture">Furniture</option>
              <option value="decor">Decor</option>
              <option value="kitchen">Kitchen</option>
            </optgroup>
          </select>
          <span className="zid-select__icon">▼</span>
        </div>
      </div>
    </div>
  ),
};
