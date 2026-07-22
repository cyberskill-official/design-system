import { Badge } from '../components/feedback/Badge.jsx';
import { Tag } from '../components/feedback/Tag.jsx';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <Badge>Planned</Badge>
      <Badge variant="ochre" dot>
        Now
      </Badge>
      <Badge variant="success" dot>
        Shipped
      </Badge>
      <Badge variant="danger">Blocked</Badge>
      <Badge variant="info">AI</Badge>
      <Tag>Web apps</Tag>
    </div>
  ),
};
