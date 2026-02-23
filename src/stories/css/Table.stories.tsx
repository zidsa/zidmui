import type { StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import '../../css/index.css';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', role: 'Editor' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active', role: 'User' },
];

const meta = {
  title: 'CSS Styles/Components/Table',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Default</h3>
        <table className="zid-table">
          <thead className="zid-table__head">
            <tr className="zid-table__row">
              <th className="zid-table__cell">ID</th>
              <th className="zid-table__cell">Name</th>
              <th className="zid-table__cell">Email</th>
              <th className="zid-table__cell">Status</th>
            </tr>
          </thead>
          <tbody className="zid-table__body">
            {sampleData.slice(0, 4).map(row => (
              <tr key={row.id} className="zid-table__row">
                <td className="zid-table__cell">{row.id}</td>
                <td className="zid-table__cell">{row.name}</td>
                <td className="zid-table__cell">{row.email}</td>
                <td className="zid-table__cell">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Striped</h3>
        <table className="zid-table zid-table--striped">
          <thead className="zid-table__head">
            <tr className="zid-table__row">
              <th className="zid-table__cell">ID</th>
              <th className="zid-table__cell">Name</th>
              <th className="zid-table__cell">Email</th>
              <th className="zid-table__cell">Status</th>
            </tr>
          </thead>
          <tbody className="zid-table__body">
            {sampleData.slice(0, 4).map(row => (
              <tr key={row.id} className="zid-table__row">
                <td className="zid-table__cell">{row.id}</td>
                <td className="zid-table__cell">{row.name}</td>
                <td className="zid-table__cell">{row.email}</td>
                <td className="zid-table__cell">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Bordered</h3>
        <table className="zid-table zid-table--bordered">
          <thead className="zid-table__head">
            <tr className="zid-table__row">
              <th className="zid-table__cell">ID</th>
              <th className="zid-table__cell">Name</th>
              <th className="zid-table__cell">Email</th>
              <th className="zid-table__cell">Status</th>
            </tr>
          </thead>
          <tbody className="zid-table__body">
            {sampleData.slice(0, 4).map(row => (
              <tr key={row.id} className="zid-table__row">
                <td className="zid-table__cell">{row.id}</td>
                <td className="zid-table__cell">{row.name}</td>
                <td className="zid-table__cell">{row.email}</td>
                <td className="zid-table__cell">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'var(--zid-font-family)' }}>Hoverable</h3>
        <table className="zid-table zid-table--hoverable">
          <thead className="zid-table__head">
            <tr className="zid-table__row">
              <th className="zid-table__cell">ID</th>
              <th className="zid-table__cell">Name</th>
              <th className="zid-table__cell">Email</th>
              <th className="zid-table__cell">Status</th>
            </tr>
          </thead>
          <tbody className="zid-table__body">
            {sampleData.slice(0, 4).map(row => (
              <tr key={row.id} className="zid-table__row">
                <td className="zid-table__cell">{row.id}</td>
                <td className="zid-table__cell">{row.name}</td>
                <td className="zid-table__cell">{row.email}</td>
                <td className="zid-table__cell">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};


const statusMap: Record<string, ReactNode> = {
  'Active': <span className="zid-status zid-status--success zid-status--sm"><span className="zid-status__dot"></span>Active</span>,
  'Pending': <span className="zid-status zid-status--warning zid-status--sm"><span className="zid-status__dot"></span>Pending</span>,
  'Inactive': <span className="zid-status zid-status--error zid-status--sm"><span className="zid-status__dot"></span>Inactive</span>,
};

export const WithStatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>With Status Badges</h3>
      <table className="zid-table zid-table--hoverable">
        <thead className="zid-table__head">
          <tr className="zid-table__row">
            <th className="zid-table__cell">ID</th>
            <th className="zid-table__cell">Name</th>
            <th className="zid-table__cell">Email</th>
            <th className="zid-table__cell">Role</th>
            <th className="zid-table__cell">Status</th>
          </tr>
        </thead>
        <tbody className="zid-table__body">
          {sampleData.map(row => (
            <tr key={row.id} className="zid-table__row">
              <td className="zid-table__cell">{row.id}</td>
              <td className="zid-table__cell">{row.name}</td>
              <td className="zid-table__cell">{row.email}</td>
              <td className="zid-table__cell">{row.role}</td>
              <td className="zid-table__cell">{statusMap[row.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>With Action Buttons</h3>
      <table className="zid-table zid-table--hoverable">
        <thead className="zid-table__head">
          <tr className="zid-table__row">
            <th className="zid-table__cell">ID</th>
            <th className="zid-table__cell">Name</th>
            <th className="zid-table__cell">Email</th>
            <th className="zid-table__cell">Actions</th>
          </tr>
        </thead>
        <tbody className="zid-table__body">
          {sampleData.map(row => (
            <tr key={row.id} className="zid-table__row">
              <td className="zid-table__cell">{row.id}</td>
              <td className="zid-table__cell">{row.name}</td>
              <td className="zid-table__cell">{row.email}</td>
              <td className="zid-table__cell">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="zid-button zid-button--text zid-button--primary zid-button--sm">Edit</button>
                  <button className="zid-button zid-button--text zid-button--error zid-button--sm">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Empty State</h3>
      <table className="zid-table">
        <thead className="zid-table__head">
          <tr className="zid-table__row">
            <th className="zid-table__cell">ID</th>
            <th className="zid-table__cell">Name</th>
            <th className="zid-table__cell">Email</th>
            <th className="zid-table__cell">Status</th>
          </tr>
        </thead>
        <tbody className="zid-table__body">
          <tr className="zid-table__row">
            <td className="zid-table__cell" colSpan={4} style={{ textAlign: 'center', padding: '48px' }}>
              <div style={{ color: 'var(--zid-text-secondary)', fontFamily: 'var(--zid-font-family)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>No data found</div>
                <div style={{ fontSize: '14px' }}>Try adjusting your search or filters</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
