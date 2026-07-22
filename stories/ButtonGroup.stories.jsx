import { ButtonGroup } from '../components/button/ButtonGroup.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting ButtonGroup. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<ButtonGroup><Button variant="secondary">Cancel</Button><Button>Confirm</Button></ButtonGroup>) };

export const Matrix = {
  name: 'Matrix / Sizes',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <ButtonGroup><Button size="sm">A</Button><Button size="sm" variant="secondary">B</Button></ButtonGroup>
      <ButtonGroup><Button>A</Button><Button variant="secondary">B</Button></ButtonGroup>
    </div>
  ),
};
