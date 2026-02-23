import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../../css/index.css';

//
//

const meta = {
  title: 'Design System/Spacing/CSS',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

//
// CSS Spacing Tokens
//

const spacingTokens = [
  { name: '0', px: '0px' },
  { name: '0-25', px: '2px' },
  { name: '0-5', px: '4px' },
  { name: '0-75', px: '6px' },
  { name: '1', px: '8px' },
  { name: '1-5', px: '12px' },
  { name: '2', px: '16px' },
  { name: '2-5', px: '20px' },
  { name: '3', px: '24px' },
  { name: '3-5', px: '28px' },
  { name: '4', px: '32px' },
  { name: '5', px: '40px' },
  { name: '6', px: '48px' },
  { name: '7', px: '56px' },
  { name: '8', px: '64px' },
  { name: '9', px: '72px' },
  { name: '10', px: '80px' },
  { name: '11', px: '88px' },
  { name: '12', px: '96px' },
];

export const SpacingScale: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '900px', fontFamily: 'var(--zid-font-family)' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '8px' }}>CSS Spacing Scale</h2>
        <p style={{ color: 'var(--zid-text-secondary)', marginBottom: '8px' }}>
          <strong>How to use in CSS:</strong> <code>var(--zid-spacing-&#123;value&#125;)</code>
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: '2px solid var(--zid-divider)', fontWeight: 600, fontSize: '14px' }}>
        <div style={{ width: '80px' }}>Token</div>
        <div style={{ width: '60px' }}>Value</div>
        <div style={{ flex: 1 }}>Preview (gap between boxes)</div>
      </div>
      {spacingTokens.map(token => (
        <div key={token.name} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--zid-divider)' }}>
          <div style={{ width: '80px', fontFamily: 'monospace', fontSize: '14px' }}>{token.name}</div>
          <div style={{ width: '60px', color: 'var(--zid-text-secondary)', fontSize: '14px' }}>{token.px}</div>
          <div style={{ flex: 1, display: 'flex', gap: token.px }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--zid-primary-main)', borderRadius: '4px' }}></div>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--zid-primary-main)', borderRadius: '4px' }}></div>
            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--zid-primary-main)', borderRadius: '4px' }}></div>
          </div>
        </div>
      ))}
    </div>
  ),
};
