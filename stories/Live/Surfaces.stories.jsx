import React from 'react';
import { IframeSurface } from './IframeSurface.jsx';

/**
 * Former Live View non-component tabs, absorbed into Storybook Live/*.
 * Portable HTML remains in-tree; this hub iframes it for operators.
 */
export default {
  title: 'Live/Surfaces',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Live hub surfaces formerly under guidelines/live-view.html. Portable HTML is unchanged; Storybook is the single operator Live entry.',
      },
    },
  },
};

export const ComponentsAtomicView = {
  name: 'Components (Atomic View)',
  render: () => <IframeSurface src="/guidelines/atomic-view.html" title="Atomic View" />,
};

export const Motion = {
  render: () => <IframeSurface src="/guidelines/motion.html" title="Motion" />,
};

export const IdentityLab = {
  name: 'Identity Lab',
  render: () => <IframeSurface src="/ui_kits/status-hub/identity-lab.html" title="Identity Lab" />,
};

export const TemplatePlayground = {
  name: 'Template Playground',
  render: () => <IframeSurface src="/templates/playground.html" title="Template playground" />,
};

export const KitchenSink = {
  name: 'Kitchen Sink',
  render: () => <IframeSurface src="/templates/kitchen-sink.html" title="Kitchen sink" />,
};

export const ImageSlots = {
  name: 'Image Slots',
  render: () => <IframeSurface src="/templates/image-slots-demo.html" title="Image slots" />,
};

export const AICluster = {
  name: 'AI Cluster',
  render: () => <IframeSurface src="/templates/ai-cluster-demo.html" title="AI cluster" />,
};

export const RTL = {
  render: () => <IframeSurface src="/guidelines/rtl-preview.html" title="RTL" />,
};
