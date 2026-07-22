import { FileUpload } from '../components/forms/FileUpload.jsx';

export default {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
  "title": {
    "control": "object"
  },
  "hint": {
    "control": "object"
  },
  "accept": {
    "control": "text"
  },
  "multiple": {
    "control": "boolean"
  },
  "onFiles": {
    "control": "object"
  },
  "icon": {
    "control": "object"
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
  name: 'Matrix / Accept',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <FileUpload {...args} label="PDF" accept=".pdf" />
      <FileUpload {...args} label="Images" accept=".png,.jpg" />
    </div>
  ),
};
