import { View, Text, type ViewProps } from "react-native";

export type TrustTier = "unverified" | "verified" | "confirmed" | "established";

export interface BadgeProps extends ViewProps {
  tier: TrustTier;
  className?: string;
}

const tierConfig: Record<TrustTier, { label: string; bg: string; text: string }> = {
  unverified: { label: "Unverified", bg: "bg-[#E5E5E5]", text: "text-[#5C5C5C]" },
  verified: { label: "Verified", bg: "bg-[#FEF3C7]", text: "text-[#92400E]" },
  confirmed: { label: "Confirmed", bg: "bg-[#D1DBCA]", text: "text-[#4D5946]" },
  established: { label: "Established", bg: "bg-[#FAEADF]", text: "text-[#8C472E]" },
};

export function Badge({ tier, className = "", ...props }: BadgeProps) {
  const config = tierConfig[tier];
  return (
    <View className={`flex-row items-center px-3 py-1 rounded-lg ${config.bg} ${className}`} {...props}>
      <Text className={`text-xs font-semibold ${config.text}`}>
        {config.label}
      </Text>
    </View>
  );
}
