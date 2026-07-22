import { TextField } from '../components/textfield/TextField.jsx';

export default {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Work email',
    placeholder: 'you@company.com',
  },
};

export const Default = {};

export const Error = {
  args: {
    label: 'Email',
    error: 'Enter a valid email address.',
    defaultValue: 'not-an-email',
  },
};

export const Vietnamese = {
  args: {
    label: 'Tên của bạn',
    description: 'Diacritics preserved',
    defaultValue: 'Nguyễn Hoàng Vũ',
  },
};
