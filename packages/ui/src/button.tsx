import { Pressable, Text, type PressableProps } from "react-native";

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ title, variant = "primary", size = "md", ...props }: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const variantClasses = {
    primary: "bg-[#C4704B]",
    secondary: "border-2 border-[#C4704B] bg-transparent",
    ghost: "bg-transparent",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const textClasses = {
    primary: "text-white font-semibold",
    secondary: "text-[#C4704B] font-semibold",
    ghost: "text-[#C4704B] font-medium",
  };

  return (
    <Pressable
      className={`rounded-xl items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]}`}
      {...props}
    >
      <Text className={`${textSizeClasses[size]} ${textClasses[variant]}`}>
        {title}
      </Text>
    </Pressable>
  );
}
