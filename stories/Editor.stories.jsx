import { Editor } from '../components/forms/Editor.jsx';

export default {
  title: 'Components/Forms/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {
  "defaultValue": {
    "control": "text"
  },
  "minHeight": {
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

export const Default = { args: { defaultValue: 'Draft the BOD memo…', label: 'Editor' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Editor {...args} />
      <Editor {...args} disabled={true} />
    </div>
  ),
};
