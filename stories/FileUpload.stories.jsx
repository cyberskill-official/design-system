import { FileUpload } from '../components/forms/FileUpload.jsx';

export default {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
  "accept": {
    "control": "text"
  },
  "multiple": {
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

export const Default = { args: { label: 'Attachments', accept: '.pdf,.png' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <FileUpload {...args} />
      <FileUpload {...args} disabled={true} />
    </div>
  ),
};
