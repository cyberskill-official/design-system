import { CodeBlock } from '../components/data/CodeBlock.jsx';

export default {
  title: 'Components/Data/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  argTypes: {
  "code": {
    "control": "text"
  },
  "filename": {
    "control": "text"
  },
  "language": {
    "control": "text"
  },
  "showBar": {
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

export const Default = { args: { code: 'const wish = "ship";', language: 'js' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <CodeBlock {...args} />
      <CodeBlock {...args} disabled={true} />
    </div>
  ),
};
