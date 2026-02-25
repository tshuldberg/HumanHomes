import React from 'react';

export function SafeAreaView({
  children,
}: {
  children?: React.ReactNode;
}) {
  return React.createElement('div', null, children);
}
