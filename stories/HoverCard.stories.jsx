import { HoverCard } from '../components/overlays/HoverCard.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};

export const Default = { render: () => (<HoverCard content="Lumi the golden genie"><Button variant="ghost">Hover</Button></HoverCard>) };
