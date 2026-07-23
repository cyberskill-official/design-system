import { Badge } from '../components/feedback/Badge.jsx';

const VARIANTS = ['neutral', 'solid', 'ochre', 'success', 'danger', 'warning', 'info'];

export default {
  title: 'Components/Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    dot: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Host Live CSF — Default plus exhaustive variant matrix mounting Badge. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { children: 'New' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {VARIANTS.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
      <Badge {...args} variant="ochre" dot>
        dot
      </Badge>
    </div>
  ),
};
