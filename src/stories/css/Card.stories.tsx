import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Card',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Elevation Levels</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="zid-card zid-card--elevation-0" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 0</div>
        </div>
        <div className="zid-card zid-card--elevation-1" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 1</div>
        </div>
        <div className="zid-card zid-card--elevation-2" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 2</div>
        </div>
        <div className="zid-card zid-card--elevation-4" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 4</div>
        </div>
        <div className="zid-card zid-card--elevation-8" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 8</div>
        </div>
        <div className="zid-card zid-card--elevation-16" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 16</div>
        </div>
        <div className="zid-card zid-card--elevation-24" style={{ width: '150px' }}>
          <div className="zid-card__content">Elevation 24</div>
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Card Variants</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="zid-card zid-card--elevation-1" style={{ width: '200px' }}>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Default</h3>
          </div>
          <div className="zid-card__content">Standard card with shadow</div>
        </div>
        <div className="zid-card zid-card--outlined" style={{ width: '200px' }}>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Outlined</h3>
          </div>
          <div className="zid-card__content">Card with border, no shadow</div>
        </div>
        <div className="zid-card zid-card--selected" style={{ width: '200px' }}>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Selected</h3>
          </div>
          <div className="zid-card__content">Selected state card</div>
        </div>
        <div className="zid-card zid-card--clickable zid-card--elevation-1" style={{ width: '200px' }}>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Clickable</h3>
          </div>
          <div className="zid-card__content">Hover to see effect</div>
        </div>
      </div>
    </div>
  ),
};


export const WithSubtitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>With Subtitle</h3>
      <div className="zid-card zid-card--elevation-1" style={{ width: '300px' }}>
        <div className="zid-card__header">
          <div>
            <h3 className="zid-card__title">Card Title</h3>
            <p className="zid-card__subtitle">Subtitle or description text</p>
          </div>
        </div>
        <div className="zid-card__content">This card has both a title and subtitle in the header.</div>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Action Buttons</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="zid-card zid-card--elevation-1" style={{ width: '300px' }}>
          <div className="zid-card__header">
            <div>
              <h3 className="zid-card__title">Card with Actions</h3>
              <p className="zid-card__subtitle">Subtitle text here</p>
            </div>
          </div>
          <div className="zid-card__content">This card has a footer with action buttons.</div>
          <div className="zid-card__actions">
            <button className="zid-button zid-button--text zid-button--secondary zid-button--sm">Cancel</button>
            <button className="zid-button zid-button--contained zid-button--primary zid-button--sm">Save</button>
          </div>
        </div>
        <div className="zid-card zid-card--elevation-1" style={{ width: '300px' }}>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Confirm Action</h3>
          </div>
          <div className="zid-card__content">Are you sure you want to delete this item? This action cannot be undone.</div>
          <div className="zid-card__actions">
            <button className="zid-button zid-button--outlined zid-button--secondary zid-button--sm">Cancel</button>
            <button className="zid-button zid-button--contained zid-button--error zid-button--sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>With Media</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="zid-card zid-card--elevation-1" style={{ width: '280px' }}>
          <div className="zid-card__media" style={{ height: '140px', background: 'linear-gradient(135deg, var(--zid-color-primary-400), var(--zid-color-primary-700))' }}></div>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Product Name</h3>
            <p className="zid-card__subtitle">$99.99</p>
          </div>
          <div className="zid-card__content">A brief description of the product goes here.</div>
          <div className="zid-card__actions">
            <button className="zid-button zid-button--contained zid-button--primary zid-button--sm">Add to Cart</button>
          </div>
        </div>
        <div className="zid-card zid-card--elevation-1" style={{ width: '280px' }}>
          <div className="zid-card__media" style={{ height: '140px', background: 'linear-gradient(135deg, var(--zid-color-green-400), var(--zid-color-green-700))' }}></div>
          <div className="zid-card__header">
            <h3 className="zid-card__title">Another Product</h3>
            <p className="zid-card__subtitle">$149.99</p>
          </div>
          <div className="zid-card__content">Another product description with more details.</div>
          <div className="zid-card__actions">
            <button className="zid-button zid-button--outlined zid-button--secondary zid-button--sm">Learn More</button>
            <button className="zid-button zid-button--contained zid-button--primary zid-button--sm">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SelectableCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Selectable Cards</h3>
      <p style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)', color: 'var(--zid-text-secondary)' }}>Click to select (visual demo)</p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="zid-card zid-card--clickable zid-card--elevation-1" style={{ width: '180px' }}>
          <div className="zid-card__content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
            <div style={{ fontWeight: 500 }}>Standard</div>
            <div style={{ color: 'var(--zid-text-secondary)', fontSize: '14px' }}>Free shipping</div>
          </div>
        </div>
        <div className="zid-card zid-card--clickable zid-card--selected" style={{ width: '180px' }}>
          <div className="zid-card__content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚀</div>
            <div style={{ fontWeight: 500 }}>Express</div>
            <div style={{ color: 'var(--zid-text-secondary)', fontSize: '14px' }}>2-day delivery</div>
          </div>
        </div>
        <div className="zid-card zid-card--clickable zid-card--elevation-1" style={{ width: '180px' }}>
          <div className="zid-card__content" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontWeight: 500 }}>Priority</div>
            <div style={{ color: 'var(--zid-text-secondary)', fontSize: '14px' }}>Next-day delivery</div>
          </div>
        </div>
      </div>
    </div>
  ),
};
