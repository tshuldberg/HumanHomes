import React from 'react';

export function Ionicons({
  name,
  ...props
}: {
  name: string;
}) {
  return React.createElement('span', { ...props, 'data-icon': name }, name);
}
