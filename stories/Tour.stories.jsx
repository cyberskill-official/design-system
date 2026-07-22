import { Tour } from '../components/overlays/Tour.jsx';

export default {
  title: 'Components/Overlays/Tour',
  component: Tour,
  tags: ['autodocs'],
  argTypes: {
  "open": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { steps: [{ title: 'Welcome', content: 'Host Live hub.' }, { title: 'Axes', content: 'Theme × Element × Language.' }], open: true } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Tour {...args} />
      <Tour {...args} disabled={true} />
    </div>
  ),
};
