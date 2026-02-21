import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";

export default function EditProfileScreen() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [story, setStory] = useState("");
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    // Will connect to tRPC when API is ready
    setTimeout(() => {
      setSaving(false);
      Alert.alert("Saved", "Your profile has been updated.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }, 500);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerStyle: { backgroundColor: "#FAF7F2" },
          headerTintColor: "#2D2D2D",
          headerTitleStyle: {
            fontFamily: "Georgia",
            fontWeight: "bold" as const,
          },
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView edges={["bottom"]} className="flex-1 bg-warm-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            contentContainerClassName="px-6 py-6"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-6">
              <Text className="mb-1 font-serif text-lg font-bold text-charcoal">
                About You
              </Text>
              <Text className="mb-4 text-sm text-charcoal/60">
                Tell the community a bit about yourself. What are you looking
                for? What matters to you in a home?
              </Text>
              <TextInput
                className="min-h-[100px] rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base leading-6 text-charcoal"
                placeholder="I'm a teacher and parent of two looking for a home where the kids can ride bikes on the street..."
                placeholderTextColor="#2D2D2D40"
                value={bio}
                onChangeText={setBio}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View className="mb-8">
              <Text className="mb-1 font-serif text-lg font-bold text-charcoal">
                Your Story
              </Text>
              <Text className="mb-4 text-sm text-charcoal/60">
                Share what home means to you. This helps sellers understand who
                you are beyond the numbers.
              </Text>
              <TextInput
                className="min-h-[140px] rounded-xl border border-charcoal/20 bg-white px-4 py-3.5 text-base leading-6 text-charcoal"
                placeholder="We've been renting in the city for five years. We love our neighborhood but dream of having a yard where..."
                placeholderTextColor="#2D2D2D40"
                value={story}
                onChangeText={setStory}
                multiline
                textAlignVertical="top"
              />
            </View>

            <Pressable
              className="items-center rounded-xl bg-terracotta px-6 py-4"
              onPress={onSave}
              disabled={saving}
            >
              <Text className="text-base font-semibold text-white">
                {saving ? "Saving..." : "Save Changes"}
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
