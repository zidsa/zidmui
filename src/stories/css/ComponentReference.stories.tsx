import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Component Reference',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonReference: Story = {
  render: () => (
    <div style={{ padding: '32px', maxWidth: '900px', fontFamily: 'var(--zid-font-family, system-ui)' }}>
      <h1 style={{ marginBottom: '8px' }}>Button</h1>
      <p style={{ color: '#75727B', marginBottom: '32px' }}>Button component class reference</p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Class Structure</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`<button class="zid-button zid-button--{variant} zid-button--{color} zid-button--{size}">
  Button Text
</button>`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Variants</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">contained</button>
          <button className="zid-button zid-button--outlined zid-button--primary zid-button--md">outlined</button>
          <button className="zid-button zid-button--text zid-button--primary zid-button--md">text</button>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
{`zid-button--contained
zid-button--outlined
zid-button--text`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Colors</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">primary</button>
          <button className="zid-button zid-button--contained zid-button--secondary zid-button--md">secondary</button>
          <button className="zid-button zid-button--contained zid-button--error zid-button--md">error</button>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
{`zid-button--primary
zid-button--secondary
zid-button--error`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Sizes</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--sm">sm</button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--md">md</button>
          <button className="zid-button zid-button--contained zid-button--primary zid-button--lg">lg</button>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
{`zid-button--sm
zid-button--md
zid-button--lg`}
        </pre>
      </div>
    </div>
  ),
};

export const InputReference: Story = {
  render: () => (
    <div style={{ padding: '32px', maxWidth: '900px', fontFamily: 'var(--zid-font-family, system-ui)' }}>
      <h1 style={{ marginBottom: '8px' }}>Input</h1>
      <p style={{ color: '#75727B', marginBottom: '32px' }}>Input component class reference</p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Basic Structure</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`<div class="zid-input zid-input--{size}">
  <input type="text" class="zid-input__field" placeholder="...">
</div>`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>With Label & Helper</h2>
        <div style={{ maxWidth: '300px', marginBottom: '16px' }}>
          <label className="zid-input-label">Email</label>
          <div className="zid-input zid-input--md">
            <input type="email" className="zid-input__field" placeholder="Enter email" />
          </div>
          <div className="zid-input-helper">We'll never share your email</div>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
{`<label class="zid-input-label">Email</label>
<div class="zid-input zid-input--md">
  <input type="email" class="zid-input__field" placeholder="Enter email">
</div>
<div class="zid-input-helper">Helper text</div>`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>States</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px', marginBottom: '16px' }}>
          <div className="zid-input zid-input--md">
            <input type="text" className="zid-input__field" placeholder="Default" />
          </div>
          <div className="zid-input zid-input--md zid-input--error">
            <input type="text" className="zid-input__field" placeholder="Error" />
          </div>
          <div className="zid-input zid-input--md zid-input--disabled">
            <input type="text" className="zid-input__field" placeholder="Disabled" disabled />
          </div>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
{`zid-input--error
zid-input--disabled`}
        </pre>
      </div>
    </div>
  ),
};

export const AlertReference: Story = {
  render: () => (
    <div style={{ padding: '32px', maxWidth: '900px', fontFamily: 'var(--zid-font-family, system-ui)' }}>
      <h1 style={{ marginBottom: '8px' }}>Alert</h1>
      <p style={{ color: '#75727B', marginBottom: '32px' }}>Alert component class reference</p>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Basic Structure</h2>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
{`<div class="zid-alert zid-alert--{severity}">
  <div class="zid-alert__icon">icon</div>
  <div class="zid-alert__content">
    <div class="zid-alert__title">Title</div>
    <div class="zid-alert__message">Message</div>
  </div>
  <button class="zid-alert__close">×</button>
</div>`}
        </pre>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '16px' }}>Severity Variants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          <div className="zid-alert zid-alert--success">
            <div className="zid-alert__icon">✓</div>
            <div className="zid-alert__content"><div className="zid-alert__message">Success alert</div></div>
          </div>
          <div className="zid-alert zid-alert--info">
            <div className="zid-alert__icon">i</div>
            <div className="zid-alert__content"><div className="zid-alert__message">Info alert</div></div>
          </div>
          <div className="zid-alert zid-alert--warning">
            <div className="zid-alert__icon">!</div>
            <div className="zid-alert__content"><div className="zid-alert__message">Warning alert</div></div>
          </div>
          <div className="zid-alert zid-alert--error">
            <div className="zid-alert__icon">✕</div>
            <div className="zid-alert__content"><div className="zid-alert__message">Error alert</div></div>
          </div>
        </div>
        <pre style={{ background: '#1f0433', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
{`zid-alert--success
zid-alert--info
zid-alert--warning
zid-alert--error
zid-alert--filled  /* filled variant */`}
        </pre>
      </div>
    </div>
  ),
};
