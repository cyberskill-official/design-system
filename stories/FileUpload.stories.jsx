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
  },
  "title": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting FileUpload. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Attachments', accept: '.pdf,.png' } };

export const Matrix = {
  name: 'Matrix / multiple',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <FileUpload {...args} multiple={false} />
      <FileUpload {...args} multiple={true} />
    </div>
  ),
};
