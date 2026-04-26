/**
 * Card.figma.tsx — Figma Code Connect mapping for <cs-card>.
 */

import { figma } from '@figma/code-connect';

figma.connect('cs-card', 'https://www.figma.com/design/YOUR_FILE_KEY/CyberSkill-DS?node-id=CARD_NODE', {
  props: {
    interactive: figma.boolean('Interactive'),
    elevation: figma.enum('Elevation', { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }),
    padding: figma.enum('Padding', { None: 'none', SM: 'sm', MD: 'md', LG: 'lg' }),
    body: figma.children('Body'),
    header: figma.children('Header'),
    footer: figma.children('Footer'),
  },
  example: ({ interactive, elevation, padding, header, body, footer }) => (
    `<cs-card ${interactive ? 'interactive' : ''} elevation="${elevation}" padding="${padding}">
      ${header ? `<div slot="header">${header}</div>` : ''}
      ${body}
      ${footer ? `<div slot="footer">${footer}</div>` : ''}
    </cs-card>`
  ),
});
