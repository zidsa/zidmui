import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Utilities',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UtilityClasses: Story = {
  render: () => (
    <div style={{ padding: '32px', maxWidth: '900px', fontFamily: 'var(--zid-font-family, system-ui)' }}>
      <h1 style={{ marginBottom: '8px' }}>Utility Classes</h1>
      <p style={{ color: '#75727B', marginBottom: '32px' }}>Helper classes for common styling needs</p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Display</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`.zid-d-flex      /* display: flex */
.zid-d-block     /* display: block */
.zid-d-inline    /* display: inline */
.zid-d-none      /* display: none */
.zid-d-grid      /* display: grid */`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Flexbox</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`/* Direction */
.zid-flex-row        /* flex-direction: row */
.zid-flex-col        /* flex-direction: column */

/* Justify Content */
.zid-justify-start   /* justify-content: flex-start */
.zid-justify-end     /* justify-content: flex-end */
.zid-justify-center  /* justify-content: center */
.zid-justify-between /* justify-content: space-between */
.zid-justify-around  /* justify-content: space-around */

/* Align Items */
.zid-align-start     /* align-items: flex-start */
.zid-align-end       /* align-items: flex-end */
.zid-align-center    /* align-items: center */
.zid-align-stretch   /* align-items: stretch */

/* Flex Wrap */
.zid-flex-wrap       /* flex-wrap: wrap */
.zid-flex-nowrap     /* flex-wrap: nowrap */

/* Gap */
.zid-gap-1           /* gap: 8px */
.zid-gap-2           /* gap: 16px */
.zid-gap-3           /* gap: 24px */
.zid-gap-4           /* gap: 32px */`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Spacing (Margin & Padding)</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`/* Margin - all sides */
.zid-m-0, .zid-m-1, .zid-m-2, .zid-m-3, .zid-m-4

/* Margin - specific sides */
.zid-mt-{0-4}   /* margin-top */
.zid-mr-{0-4}   /* margin-right */
.zid-mb-{0-4}   /* margin-bottom */
.zid-ml-{0-4}   /* margin-left */
.zid-mx-{0-4}   /* margin-left + margin-right */
.zid-my-{0-4}   /* margin-top + margin-bottom */

/* Padding - all sides */
.zid-p-0, .zid-p-1, .zid-p-2, .zid-p-3, .zid-p-4

/* Padding - specific sides */
.zid-pt-{0-4}   /* padding-top */
.zid-pr-{0-4}   /* padding-right */
.zid-pb-{0-4}   /* padding-bottom */
.zid-pl-{0-4}   /* padding-left */
.zid-px-{0-4}   /* padding-left + padding-right */
.zid-py-{0-4}   /* padding-top + padding-bottom */`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Text</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`/* Text alignment */
.zid-text-left
.zid-text-center
.zid-text-right

/* Text colors */
.zid-text-primary
.zid-text-secondary
.zid-text-error
.zid-text-success
.zid-text-warning

/* Font weight */
.zid-font-regular
.zid-font-medium
.zid-font-bold`}
        </pre>
      </div>
    </div>
  ),
};

export const UtilityExamples: Story = {
  render: () => (
    <div style={{ padding: '32px', maxWidth: '900px', fontFamily: 'var(--zid-font-family, system-ui)' }}>
      <h1 style={{ marginBottom: '8px' }}>Utility Examples</h1>
      <p style={{ color: '#75727B', marginBottom: '32px' }}>Live examples of utility classes</p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Flexbox Layout</h2>
        <div className="zid-d-flex zid-justify-between zid-align-center zid-gap-2 zid-p-3" style={{ background: 'var(--zid-base-neutral, #F5F4F6)', borderRadius: '8px' }}>
          <div style={{ padding: '16px', background: 'var(--zid-primary-main, #AE72FF)', color: 'white', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '16px', background: 'var(--zid-primary-main, #AE72FF)', color: 'white', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '16px', background: 'var(--zid-primary-main, #AE72FF)', color: 'white', borderRadius: '4px' }}>Item 3</div>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
{`<div class="zid-d-flex zid-justify-between zid-align-center zid-gap-2 zid-p-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Spacing</h2>
        <div style={{ background: 'var(--zid-base-neutral, #F5F4F6)', borderRadius: '8px', padding: '16px' }}>
          <div className="zid-mb-2" style={{ padding: '12px', background: 'var(--zid-color-blue-200, #E9FAFA)', borderRadius: '4px' }}>
            Box with margin-bottom (zid-mb-2)
          </div>
          <div className="zid-p-3" style={{ background: 'var(--zid-color-green-200, #EFFBEE)', borderRadius: '4px' }}>
            Box with padding (zid-p-3)
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Text Colors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="zid-text-primary" style={{ fontSize: '16px' }}>Primary text color</span>
          <span className="zid-text-secondary" style={{ fontSize: '16px' }}>Secondary text color</span>
          <span className="zid-text-error" style={{ fontSize: '16px' }}>Error text color</span>
          <span className="zid-text-success" style={{ fontSize: '16px' }}>Success text color</span>
        </div>
      </div>
    </div>
  ),
};
