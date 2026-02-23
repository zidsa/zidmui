import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';
import { IconCloseLine } from '~/icons/system/close-line';

const meta = {
  title: 'CSS Styles/Components/Modal',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Modal Sizes (Static Preview)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)', fontSize: '14px' }}>Small (sm)</h4>
          <div style={{ position: 'relative', background: 'rgba(0,0,0,0.5)', padding: '24px', borderRadius: '8px' }}>
            <div className="zid-modal__content zid-modal__content--sm" style={{ position: 'relative' }}>
              <div className="zid-modal__header">
                <h2 className="zid-modal__title">Small Modal</h2>
                <button className="zid-modal__close"><IconCloseLine /></button>
              </div>
              <div className="zid-modal__body">Small modal content goes here.</div>
              <div className="zid-modal__footer">
                <button className="zid-button zid-button--text zid-button--secondary zid-button--md">Cancel</button>
                <button className="zid-button zid-button--contained zid-button--primary zid-button--md">Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)', fontSize: '14px' }}>Medium (md)</h4>
          <div style={{ position: 'relative', background: 'rgba(0,0,0,0.5)', padding: '24px', borderRadius: '8px' }}>
            <div className="zid-modal__content zid-modal__content--md" style={{ position: 'relative' }}>
              <div className="zid-modal__header">
                <h2 className="zid-modal__title">Medium Modal</h2>
                <button className="zid-modal__close"><IconCloseLine /></button>
              </div>
              <div className="zid-modal__body">Medium modal content goes here. This is the default size for most use cases.</div>
              <div className="zid-modal__footer">
                <button className="zid-button zid-button--text zid-button--secondary zid-button--md">Cancel</button>
                <button className="zid-button zid-button--contained zid-button--primary zid-button--md">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Modal with Form</h3>
      <div style={{ position: 'relative', background: 'rgba(0,0,0,0.5)', padding: '24px', borderRadius: '8px' }}>
        <div className="zid-modal__content zid-modal__content--md" style={{ position: 'relative' }}>
          <div className="zid-modal__header">
            <h2 className="zid-modal__title">Create New Item</h2>
            <button className="zid-modal__close"><IconCloseLine /></button>
          </div>
          <div className="zid-modal__body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="zid-input-label zid-input-label--required">Name</label>
                <div className="zid-input zid-input--md">
                  <input type="text" className="zid-input__field" placeholder="Enter name" />
                </div>
              </div>
              <div>
                <label className="zid-input-label">Description</label>
                <div className="zid-input zid-input--md">
                  <input type="text" className="zid-input__field" placeholder="Enter description" />
                </div>
              </div>
              <div>
                <label className="zid-input-label zid-input-label--required">Category</label>
                <div className="zid-select zid-select--md">
                  <select className="zid-select__native" defaultValue="">
                    <option value="" disabled>Select category</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </select>
                  <span className="zid-select__icon">▼</span>
                </div>
              </div>
            </div>
          </div>
          <div className="zid-modal__footer">
            <button className="zid-button zid-button--text zid-button--secondary zid-button--md">Cancel</button>
            <button className="zid-button zid-button--contained zid-button--primary zid-button--md">Create</button>
          </div>
        </div>
      </div>
    </div>
  ),
};


export const ConfirmationDialog: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Confirmation Dialog</h3>
      <div style={{ position: 'relative', background: 'rgba(0,0,0,0.5)', padding: '24px', borderRadius: '8px' }}>
        <div className="zid-modal__content zid-modal__content--sm" style={{ position: 'relative' }}>
          <div className="zid-modal__header">
            <h2 className="zid-modal__title">Delete Item?</h2>
            <button className="zid-modal__close"><IconCloseLine /></button>
          </div>
          <div className="zid-modal__body">
            <p style={{ fontFamily: 'var(--zid-font-family)', color: 'var(--zid-text-secondary)', margin: 0 }}>
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </div>
          <div className="zid-modal__footer">
            <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Cancel</button>
            <button className="zid-button zid-button--contained zid-button--error zid-button--md">Delete</button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Info Modal (No Footer)</h3>
      <div style={{ position: 'relative', background: 'rgba(0,0,0,0.5)', padding: '24px', borderRadius: '8px' }}>
        <div className="zid-modal__content zid-modal__content--sm" style={{ position: 'relative' }}>
          <div className="zid-modal__header">
            <h2 className="zid-modal__title">Information</h2>
            <button className="zid-modal__close"><IconCloseLine /></button>
          </div>
          <div className="zid-modal__body">
            <div className="zid-alert zid-alert--info">
              <div className="zid-alert__icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div className="zid-alert__content">
                <div className="zid-alert__message">This is an informational modal without action buttons.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
