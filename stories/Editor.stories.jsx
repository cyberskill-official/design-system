import { Editor } from '../components/forms/Editor.jsx';

export default {
  title: 'Components/Forms/Editor',
  component: Editor,
  tags: ['autodocs'],
  argTypes: {
  "defaultValue": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "minHeight": {
    "control": "number"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Editor. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { defaultValue: 'Draft…', label: 'Editor' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Content',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Editor {...args} label="A" defaultValue="Short" />
      <Editor {...args} label="B" defaultValue="Longer draft body for matrix." />
    </div>
  ),
};
