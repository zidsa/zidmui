import type { StoryObj } from '@storybook/react-vite';
import '../../css/index.css';

const meta = {
  title: 'CSS Styles/Components/Tooltip',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '80px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Top</button>
          <div className="zid-tooltip__content zid-tooltip__content--top">
            <div className="zid-tooltip__description">Tooltip on top</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Left</button>
          <div className="zid-tooltip__content zid-tooltip__content--left">
            <div className="zid-tooltip__description">Tooltip on left</div>
          </div>
        </div>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Right</button>
          <div className="zid-tooltip__content zid-tooltip__content--right">
            <div className="zid-tooltip__description">Tooltip on right</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Bottom</button>
          <div className="zid-tooltip__content zid-tooltip__content--bottom">
            <div className="zid-tooltip__description">Tooltip on bottom</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '80px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Tooltip with Title</h3>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">With Title</button>
          <div className="zid-tooltip__content zid-tooltip__content--top zid-tooltip__content--multiline">
            <div className="zid-tooltip__title">Tooltip Title</div>
            <div className="zid-tooltip__description">This is a longer description that provides more context about the element.</div>
          </div>
        </div>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Help Info</button>
          <div className="zid-tooltip__content zid-tooltip__content--top zid-tooltip__content--multiline">
            <div className="zid-tooltip__title">Need Help?</div>
            <div className="zid-tooltip__description">Click here to access our help center and documentation.</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SimpleTooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '60px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Simple Tooltips</h3>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--text zid-button--secondary zid-button--sm">Edit</button>
          <div className="zid-tooltip__content zid-tooltip__content--top">
            <div className="zid-tooltip__description">Edit item</div>
          </div>
        </div>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--text zid-button--error zid-button--sm">Delete</button>
          <div className="zid-tooltip__content zid-tooltip__content--top">
            <div className="zid-tooltip__description">Delete item</div>
          </div>
        </div>
        <div className="zid-tooltip zid-tooltip--open">
          <button className="zid-button zid-button--text zid-button--secondary zid-button--sm">Copy</button>
          <div className="zid-tooltip__content zid-tooltip__content--top">
            <div className="zid-tooltip__description">Copy to clipboard</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '60px' }}>
      <h3 style={{ marginBottom: '8px', fontFamily: 'var(--zid-font-family)' }}>Interactive Demo (Hover to show)</h3>
      <p style={{ fontFamily: 'var(--zid-font-family)', color: 'var(--zid-text-secondary)', marginBottom: '16px' }}>Hover over the buttons to see tooltips appear</p>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div className="zid-tooltip">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Hover me</button>
          <div className="zid-tooltip__content zid-tooltip__content--top">
            <div className="zid-tooltip__description">I appear on hover!</div>
          </div>
        </div>
        <div className="zid-tooltip">
          <button className="zid-button zid-button--outlined zid-button--secondary zid-button--md">Or me</button>
          <div className="zid-tooltip__content zid-tooltip__content--bottom">
            <div className="zid-tooltip__description">I appear below!</div>
          </div>
        </div>
        <div className="zid-tooltip">
          <button className="zid-button zid-button--text zid-button--secondary zid-button--md">Me too</button>
          <div className="zid-tooltip__content zid-tooltip__content--right">
            <div className="zid-tooltip__description">I appear on the right!</div>
          </div>
        </div>
      </div>
    </div>
  ),
};
