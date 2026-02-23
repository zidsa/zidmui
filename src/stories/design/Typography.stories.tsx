import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'Design System/Typography/CSS',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CSSTypography: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '900px', fontFamily: 'var(--zid-font-family)' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '8px' }}>Typography Scale</h2>
        <p style={{ color: 'var(--zid-text-secondary)' }}>Access typography via CSS variables: <code>var(--zid-font-&#123;property&#125;)</code></p>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px' }}>Font Family</h3>
        <div style={{ padding: '20px', background: 'var(--zid-base-neutral)', borderRadius: '8px', marginBottom: '16px' }}>
          <p style={{ fontSize: '24px', margin: 0 }}>IBM Plex Sans Arabic</p>
          <p style={{ fontSize: '14px', color: 'var(--zid-text-secondary)', margin: '8px 0 0 0' }}>The quick brown fox jumps over the lazy dog</p>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', fontSize: '13px', margin: 0 }}>
{`font-family: var(--zid-font-family);`}
        </pre>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ marginBottom: '16px' }}>Font Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: '4xl (36px)', var: '--zid-font-size-4xl' },
            { name: '3xl (30px)', var: '--zid-font-size-3xl' },
            { name: '2xl (24px)', var: '--zid-font-size-2xl' },
            { name: 'xl (20px)', var: '--zid-font-size-xl' },
            { name: 'lg (18px)', var: '--zid-font-size-lg' },
            { name: 'base (16px)', var: '--zid-font-size-base' },
            { name: 'sm (14px)', var: '--zid-font-size-sm' },
            { name: 'xs (12px)', var: '--zid-font-size-xs' },
          ].map(size => (
            <div key={size.name} style={{ display: 'flex', alignItems: 'baseline', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--zid-divider)' }}>
              <div style={{ width: '100px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--zid-text-secondary)' }}>{size.name}</div>
              <div style={{ fontSize: `var(${size.var})`, flex: 1 }}>Heading Text</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '900px', fontFamily: 'var(--zid-font-family)' }}>
      <h2 style={{ marginBottom: '24px' }}>Font Weights</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--zid-base-neutral)', borderRadius: '8px' }}>
          <div style={{ width: '120px', fontFamily: 'monospace', fontSize: '13px' }}>regular (400)</div>
          <div style={{ fontSize: '24px', fontWeight: 'var(--zid-font-weight-regular)', flex: 1 }}>The quick brown fox</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--zid-base-neutral)', borderRadius: '8px' }}>
          <div style={{ width: '120px', fontFamily: 'monospace', fontSize: '13px' }}>medium (500)</div>
          <div style={{ fontSize: '24px', fontWeight: 'var(--zid-font-weight-medium)', flex: 1 }}>The quick brown fox</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--zid-base-neutral)', borderRadius: '8px' }}>
          <div style={{ width: '120px', fontFamily: 'monospace', fontSize: '13px' }}>semibold (600)</div>
          <div style={{ fontSize: '24px', fontWeight: 'var(--zid-font-weight-semibold)', flex: 1 }}>The quick brown fox</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--zid-base-neutral)', borderRadius: '8px' }}>
          <div style={{ width: '120px', fontFamily: 'monospace', fontSize: '13px' }}>bold (700)</div>
          <div style={{ fontSize: '24px', fontWeight: 'var(--zid-font-weight-bold)', flex: 1 }}>The quick brown fox</div>
        </div>
      </div>
      <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>
{`font-weight: var(--zid-font-weight-regular);  /* 400 */
font-weight: var(--zid-font-weight-medium);   /* 500 */
font-weight: var(--zid-font-weight-semibold); /* 600 */
font-weight: var(--zid-font-weight-bold);     /* 700 */`}
      </pre>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '24px', maxWidth: '900px', fontFamily: 'var(--zid-font-family)' }}>
      <h2 style={{ marginBottom: '24px' }}>Usage Examples</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div>
          <h3 style={{ marginBottom: '16px' }}>Page Header</h3>
          <div style={{ padding: '24px', background: 'var(--zid-base-neutral)', borderRadius: '8px', marginBottom: '16px' }}>
            <h1 style={{ fontSize: 'var(--zid-font-size-3xl)', fontWeight: 'var(--zid-font-weight-bold)', margin: '0 0 8px 0' }}>Dashboard Overview</h1>
            <p style={{ fontSize: 'var(--zid-font-size-base)', color: 'var(--zid-text-secondary)', margin: 0 }}>Welcome back! Here's what's happening today.</p>
          </div>
          <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', fontSize: '13px', margin: 0 }}>
{`.page-title {
  font-size: var(--zid-font-size-3xl);
  font-weight: var(--zid-font-weight-bold);
}

.page-subtitle {
  font-size: var(--zid-font-size-base);
  color: var(--zid-text-secondary);
}`}
          </pre>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px' }}>Card Content</h3>
          <div className="zid-card zid-card--elevation-1" style={{ padding: '20px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: 'var(--zid-font-size-lg)', fontWeight: 'var(--zid-font-weight-semibold)', margin: '0 0 8px 0' }}>Card Title</h4>
            <p style={{ fontSize: 'var(--zid-font-size-sm)', color: 'var(--zid-text-secondary)', lineHeight: 'var(--zid-line-height-normal)', margin: 0 }}>This is the card description with proper typography settings applied.</p>
          </div>
          <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', fontSize: '13px', margin: 0 }}>
{`.card-title {
  font-size: var(--zid-font-size-lg);
  font-weight: var(--zid-font-weight-semibold);
}

.card-description {
  font-size: var(--zid-font-size-sm);
  line-height: var(--zid-line-height-normal);
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
