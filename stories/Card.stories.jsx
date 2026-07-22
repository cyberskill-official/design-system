import { Card, CardHeader, CardBody, CardFooter } from '../components/data/Card.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Data/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
  "interactive": {
    "control": "boolean"
  },
  "flat": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Card. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Card><CardHeader>Wish</CardHeader><CardBody>Turn Your Will Into Real</CardBody><CardFooter><Button size="sm">Open</Button></CardFooter></Card>) };

export const Matrix = {
  name: 'Matrix / interactive',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Card {...args} interactive={false} />
      <Card {...args} interactive={true} />
    </div>
  ),
};
