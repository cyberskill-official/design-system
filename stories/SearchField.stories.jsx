import { SearchField } from '../components/forms/SearchField.jsx';

export default {
  title: 'Components/Forms/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting SearchField. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { placeholder: 'Search…', label: 'Search' } };

export const Matrix = {
  name: 'Matrix / Placeholders',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <SearchField {...args} label="Search" placeholder="Components…" />
      <SearchField {...args} label="Search" placeholder="Templates…" />
    </div>
  ),
};
