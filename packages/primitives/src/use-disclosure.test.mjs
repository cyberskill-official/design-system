import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDisclosure, useDisclosure } from './use-disclosure.mjs';

test('createDisclosure — opens, closes, toggles', () => {
  const d = createDisclosure({ defaultOpen: false });
  assert.equal(d.state.isOpen, false);
  d.open();
  assert.equal(d.state.isOpen, true);
  d.close();
  assert.equal(d.state.isOpen, false);
  d.toggle();
  assert.equal(d.state.isOpen, true);
});

test('createDisclosure — props expose ARIA attributes', () => {
  const d = createDisclosure();
  assert.equal(d.props.trigger['aria-expanded'], false);
  assert.ok(d.props.content.id.startsWith('cs-disclosure-'));
  assert.equal(d.props.content.role, 'region');
  assert.equal(d.props.content.hidden, true);
  d.open();
  assert.equal(d.props.trigger['aria-expanded'], true);
  assert.equal(d.props.content.hidden, false);
});

test('createDisclosure — subscribers fire on state change', () => {
  const d = createDisclosure();
  let calls = 0;
  d.subscribe(() => { calls++; });
  d.open();   // 1
  d.close();  // 2
  d.toggle(); // 3
  assert.equal(calls, 3);
});

test('createDisclosure — onOpen / onClose fire', () => {
  let opened = false;
  let closed = false;
  const d = createDisclosure({
    onOpen: () => { opened = true; },
    onClose: () => { closed = true; },
  });
  d.open();
  assert.equal(opened, true);
  d.close();
  assert.equal(closed, true);
});

test('useDisclosure — returns hook-shaped result', () => {
  const r = useDisclosure({ defaultOpen: true });
  assert.equal(r.isOpen, true);
  assert.ok(typeof r.open === 'function');
  assert.ok(typeof r.toggle === 'function');
  assert.ok(r.triggerProps['aria-expanded'] === true);
});
