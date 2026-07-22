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
        component: 'Host Live CSF — Default plus honest control matrix mounting CodeBlock. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { code: 'const wish = "ship";', language: 'js' } };

export const Matrix = {
  name: 'Matrix / showBar',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <CodeBlock {...args} showBar={false} />
      <CodeBlock {...args} showBar={true} />
    </div>
  ),
};
