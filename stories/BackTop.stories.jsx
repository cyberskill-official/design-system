import { BackTop } from '../components/navigation/BackTop.jsx';

export default {
  title: 'Components/Navigation/BackTop',
  component: BackTop,
  tags: ['autodocs'],
  argTypes: {
  "threshold": {
    "control": "number"
  },
  "label": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting BackTop. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<div style={{ height: 200, overflow: 'auto' }}><p style={{ height: 400 }}>Scroll…</p><BackTop /></div>) };

export const Matrix = {
  name: 'Matrix / Scroll host',
  render: () => (
    <div style={{ height: 160, overflow: 'auto', border: '1px solid var(--cs-color-border-default)' }}>
      <p style={{ height: 400, margin: 0, padding: 12 }}>Scroll down for BackTop</p>
      <BackTop />
    </div>
  ),
};
