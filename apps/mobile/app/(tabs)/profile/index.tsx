import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal/40">
        {title}
      </Text>
      <View className="rounded-2xl bg-white p-5 shadow-sm">{children}</View>
    </View>
  );
}

function ProfileRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className="flex-row items-center py-2.5"
      onPress={onPress}
      disabled={!onPress}
    >
      <Ionicons name={icon} size={20} color="#8B9F82" />
      <Text className="ml-3 flex-1 text-sm font-medium text-charcoal">
        {label}
      </Text>
      {value ? (
        <Text className="text-sm text-charcoal/60">{value}</Text>
      ) : null}
      {onPress ? (
        <Ionicons
          name="chevron-forward"
          size={16}
          color="#2D2D2D40"
          style={{ marginLeft: 8 }}
        />
      ) : null}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const showComingSoon = (feature: string) => {
    Alert.alert(feature, `${feature} settings are coming soon.`);
  };

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Homeowner";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-warm-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              className="h-24 w-24 rounded-full"
            />
          ) : (
            <View className="h-24 w-24 items-center justify-center rounded-full bg-terracotta/15">
              <Text className="text-3xl font-bold text-terracotta">
                {(user?.firstName?.[0] ?? "H").toUpperCase()}
              </Text>
            </View>
          )}
          <Text className="mt-4 font-serif text-2xl font-bold text-charcoal">
            {fullName}
          </Text>
          {user?.primaryEmailAddress?.emailAddress ? (
            <Text className="mt-1 text-sm text-charcoal/60">
              {user.primaryEmailAddress.emailAddress}
            </Text>
          ) : null}
        </View>

        <ProfileSection title="Verification">
          <View className="flex-row items-center">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-amber/15">
              <Ionicons name="shield-checkmark-outline" size={16} color="#D4A84B" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm font-medium text-charcoal">
                Tier 0 — Unverified
              </Text>
              <Text className="mt-0.5 text-xs text-charcoal/50">
                Complete identity verification to unlock Tier 1
              </Text>
            </View>
          </View>
          <View className="mt-3 h-1.5 rounded-full bg-charcoal/10">
            <View className="h-1.5 w-1/12 rounded-full bg-amber" />
          </View>
        </ProfileSection>

        <ProfileSection title="Buyer / Seller Profile">
          <ProfileRow
            icon="create-outline"
            label="Edit Profile"
            value="Add your story"
            onPress={() => router.push("/(tabs)/profile/edit")}
          />
          <View className="border-b border-charcoal/5" />
          <ProfileRow
            icon="heart-outline"
            label="Role"
            value="Not set"
          />
          <View className="border-b border-charcoal/5" />
          <ProfileRow
            icon="location-outline"
            label="Neighborhoods"
            value="None saved"
          />
        </ProfileSection>

        <ProfileSection title="Settings">
          <ProfileRow
            icon="notifications-outline"
            label="Notifications"
            onPress={() => showComingSoon("Notifications")}
          />
          <View className="border-b border-charcoal/5" />
          <ProfileRow
            icon="lock-closed-outline"
            label="Privacy"
            onPress={() => showComingSoon("Privacy")}
          />
          <View className="border-b border-charcoal/5" />
          <ProfileRow
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => showComingSoon("Help & Support")}
          />
        </ProfileSection>

        <Pressable
          className="items-center rounded-xl border border-brick/30 px-6 py-3.5"
          onPress={() => signOut()}
        >
          <Text className="text-base font-medium text-brick">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
