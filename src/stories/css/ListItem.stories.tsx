import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const icons = {
  inbox: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
    </svg>
  ),
  bookmark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  ),
  folder: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
};

const meta = {
  title: 'CSS Styles/Components/ListItem',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Basic List</h3>
      <div className="zid-list">
        <div className="zid-list-item">
          <div className="zid-list-item__icon">{icons.inbox}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Inbox</span></div>
        </div>
        <div className="zid-list-item">
          <div className="zid-list-item__icon">{icons.bookmark}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Saved</span></div>
        </div>
        <div className="zid-list-item">
          <div className="zid-list-item__icon">{icons.settings}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Settings</span></div>
        </div>
      </div>
    </div>
  ),
};

export const WithSecondaryText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Secondary Text</h3>
      <div className="zid-list">
        <div className="zid-list-item">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">John Doe</span>
            <span className="zid-list-item__secondary">john.doe@example.com</span>
          </div>
        </div>
        <div className="zid-list-item">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Jane Smith</span>
            <span className="zid-list-item__secondary">jane.smith@example.com</span>
          </div>
        </div>
        <div className="zid-list-item">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Bob Johnson</span>
            <span className="zid-list-item__secondary">bob.johnson@example.com</span>
          </div>
        </div>
      </div>
    </div>
  ),
};


export const ClickableList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Clickable List</h3>
      <div className="zid-list">
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.folder}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Documents</span>
            <span className="zid-list-item__secondary">12 files</span>
          </div>
        </div>
        <div className="zid-list-item zid-list-item--clickable zid-list-item--selected">
          <div className="zid-list-item__icon">{icons.folder}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Images</span>
            <span className="zid-list-item__secondary">48 files (selected)</span>
          </div>
        </div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.folder}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Videos</span>
            <span className="zid-list-item__secondary">5 files</span>
          </div>
        </div>
        <div className="zid-list-item zid-list-item--clickable zid-list-item--disabled">
          <div className="zid-list-item__icon">{icons.folder}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Archived</span>
            <span className="zid-list-item__secondary">Disabled</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>With Status Badges</h3>
      <div className="zid-list">
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Order #1234</span>
            <span className="zid-list-item__secondary">John Doe - $99.99</span>
          </div>
          <span className="zid-status zid-status--success zid-status--sm" style={{ marginLeft: 'auto' }}>Completed</span>
        </div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Order #1235</span>
            <span className="zid-list-item__secondary">Jane Smith - $149.99</span>
          </div>
          <span className="zid-status zid-status--warning zid-status--sm" style={{ marginLeft: 'auto' }}>Pending</span>
        </div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text">
            <span className="zid-list-item__primary">Order #1236</span>
            <span className="zid-list-item__secondary">Bob Johnson - $49.99</span>
          </div>
          <span className="zid-status zid-status--error zid-status--sm" style={{ marginLeft: 'auto' }}>Cancelled</span>
        </div>
      </div>
    </div>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Navigation Menu</h3>
      <div className="zid-list" style={{ background: 'var(--zid-bg-paper)', borderRadius: '8px', padding: '8px' }}>
        <div className="zid-list-item zid-list-item--clickable zid-list-item--selected">
          <div className="zid-list-item__icon">{icons.inbox}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Dashboard</span></div>
        </div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.folder}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Products</span></div>
        </div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.user}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Customers</span></div>
        </div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.bookmark}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Orders</span></div>
        </div>
        <div style={{ height: '1px', background: 'var(--zid-divider)', margin: '8px 0' }}></div>
        <div className="zid-list-item zid-list-item--clickable">
          <div className="zid-list-item__icon">{icons.settings}</div>
          <div className="zid-list-item__text"><span className="zid-list-item__primary">Settings</span></div>
        </div>
      </div>
    </div>
  ),
};
