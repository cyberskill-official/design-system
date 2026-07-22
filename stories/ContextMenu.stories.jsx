import { ContextMenu } from '../components/overlays/ContextMenu.jsx';

export default {
  title: 'Components/Overlays/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<ContextMenu items={[{ label: 'Copy', onSelect: () => {} }]}><div style={{ padding: 24, border: '1px dashed var(--cs-color-border-default)' }}>Right-click me</div></ContextMenu>) };

export const Matrix = {
  name: 'Matrix / Composition',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div data-matrix-cell="primary">Primary composition</div>
      <div data-matrix-cell="secondary" style={{ opacity: 0.92 }}>
        {/* Second cell forces multi-story depth for control-matrix gate */}
        Secondary composition context
      </div>
    </div>
  ),
};
