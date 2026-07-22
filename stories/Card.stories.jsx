import { Card, CardHeader, CardBody, CardFooter } from '../components/data/Card.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Data/Card',
  component: Card,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Card><CardHeader>Wish</CardHeader><CardBody>Turn Your Will Into Real</CardBody><CardFooter><Button size="sm">Open</Button></CardFooter></Card>) };
