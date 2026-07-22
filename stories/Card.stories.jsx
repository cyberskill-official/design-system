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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Card><CardHeader>Wish</CardHeader><CardBody>Turn Your Will Into Real</CardBody><CardFooter><Button size="sm">Open</Button></CardFooter></Card>) };

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
