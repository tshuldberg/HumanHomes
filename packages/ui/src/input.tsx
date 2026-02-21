import { TextInput, View, Text, type TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  className?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <View className={className}>
      {label && (
        <Text className="text-sm font-medium text-[#2D2D2D] mb-1.5">
          {label}
        </Text>
      )}
      <TextInput
        className="w-full rounded-xl border border-[#CCCCCC] bg-[#FAF7F2] px-4 py-3 text-[#2D2D2D] placeholder:text-[#8A8A8A]"
        placeholderTextColor="#8A8A8A"
        {...props}
      />
    </View>
  );
}
