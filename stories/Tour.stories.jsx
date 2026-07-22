import { Tour } from '../components/overlays/Tour.jsx';

export default {
  title: 'Components/Overlays/Tour',
  component: Tour,
  tags: ['autodocs'],
  argTypes: {
  "open": {
    "control": "boolean"
  },
  "lang": {
    "control": "text"
  },
  "steps": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Tour. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { steps: [{ title: 'Welcome', content: 'Host Live hub.' }, { title: 'Axes', content: 'Theme × Element × Language.' }], open: true } };

export const Matrix = {
  name: 'Matrix / open',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Tour {...args} open={false} />
      <Tour {...args} open={true} />
    </div>
  ),
};
