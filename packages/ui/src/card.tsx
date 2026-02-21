import { View, type ViewProps } from "react-native";
import type { ReactNode } from "react";

export interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <View
      className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
