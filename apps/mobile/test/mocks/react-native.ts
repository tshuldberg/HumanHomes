import React from 'react';
import { vi } from 'vitest';

function renderChildren(
  children: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode),
  state = { pressed: false },
) {
  return typeof children === 'function'
    ? (children as (s: { pressed: boolean }) => React.ReactNode)(state)
    : children;
}

function sanitizeProps(props: Record<string, unknown>) {
  const next = { ...props };
  delete next.style;
  delete next.className;
  delete next.contentContainerStyle;
  delete next.contentContainerClassName;
  delete next.keyboardShouldPersistTaps;
  delete next.showsVerticalScrollIndicator;
  delete next.showsHorizontalScrollIndicator;
  delete next.horizontal;
  delete next.hitSlop;
  delete next.numberOfLines;
  delete next.trackColor;
  delete next.thumbColor;
  delete next.selectionColor;
  delete next.placeholderTextColor;
  delete next.autoCapitalize;
  delete next.autoComplete;
  delete next.keyboardType;
  delete next.secureTextEntry;
  delete next.multiline;
  delete next.textAlignVertical;
  delete next.edges;
  return next;
}

function host(tag: string) {
  return function Host({
    children,
    ...props
  }: Record<string, unknown> & { children?: React.ReactNode }) {
    return React.createElement(tag, sanitizeProps(props), renderChildren(children));
  };
}

export const View = host('div');
export const Text = host('span');
export const ScrollView = host('div');
export const KeyboardAvoidingView = host('div');
export const ActivityIndicator = host('div');
export const Image = host('img');

export const Pressable = ({
  children,
  onPress,
  onLongPress,
  disabled,
  ...props
}: Record<string, unknown> & {
  children?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
}) =>
  React.createElement(
    'button',
    {
      type: 'button',
      ...sanitizeProps(props),
      disabled: Boolean(disabled),
      onClick: disabled ? undefined : onPress,
      onContextMenu: (event: MouseEvent) => {
        event.preventDefault();
        if (!disabled) onLongPress?.();
      },
    },
    renderChildren(children),
  );

export const TextInput = React.forwardRef<HTMLInputElement, Record<string, unknown>>(
  ({ value, onChangeText, ...props }, ref) =>
    React.createElement('input', {
      ...sanitizeProps(props),
      ref,
      value: (value as string | undefined) ?? '',
      onChange: (event: unknown) =>
        (onChangeText as ((v: string) => void) | undefined)?.(
          ((event as { currentTarget?: { value?: string } }).currentTarget?.value) ?? '',
        ),
    }),
);
TextInput.displayName = 'TextInput';

export const Alert: { alert: (...args: unknown[]) => void } = {
  alert: vi.fn() as (...args: unknown[]) => void,
};

export const StyleSheet = {
  create: <T,>(styles: T) => styles,
  hairlineWidth: 1,
};

export const Platform = {
  OS: 'ios',
};
