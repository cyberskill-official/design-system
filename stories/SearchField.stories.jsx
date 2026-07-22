import { SearchField } from '../components/forms/SearchField.jsx';

export default {
  title: 'Components/Forms/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
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

export const Default = { args: { placeholder: 'Search components…', label: 'Search' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <SearchField {...args} />
      <SearchField {...args} disabled={true} />
    </div>
  ),
};
