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
        component: 'Host Live CSF — Default plus honest control matrix mounting HoverCard. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<HoverCard content="Lumi the golden genie"><Button variant="ghost">Hover</Button></HoverCard>) };

export const Matrix = {
  name: 'Matrix / Content',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <HoverCard content="Lumi"><Button variant="ghost">A</Button></HoverCard>
      <HoverCard content="CyberSkill genie"><Button variant="ghost">B</Button></HoverCard>
    </div>
  ),
};
