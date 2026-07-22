import { ContextMenu } from '../components/overlays/ContextMenu.jsx';

export default {
  title: 'Components/Overlays/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};

export const Default = { render: () => (<ContextMenu items={[{ label: 'Copy', onSelect: () => {} }]}><div style={{ padding: 24, border: '1px dashed var(--cs-color-border-default)' }}>Right-click me</div></ContextMenu>) };
