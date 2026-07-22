import { HoverCard } from '../components/overlays/HoverCard.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
  "openDelay": {
    "control": "number"
  },
  "closeDelay": {
    "control": "number"
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

export const Default = { render: () => (<HoverCard content="Lumi the golden genie"><Button variant="ghost">Hover</Button></HoverCard>) };

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
