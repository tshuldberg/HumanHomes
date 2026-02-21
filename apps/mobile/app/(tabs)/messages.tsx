import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function MessagesScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-warm-white">
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-terracotta/10">
          <Ionicons name="chatbubbles-outline" size={36} color="#C4704B" />
        </View>
        <Text className="font-serif text-2xl font-bold text-charcoal">
          Your Conversations
        </Text>
        <Text className="mt-3 text-center text-base leading-6 text-charcoal/60">
          When you connect with a seller or buyer, your conversations will
          appear here. Every great home story starts with a hello.
        </Text>
        <View className="mt-8 rounded-2xl bg-sage/10 px-6 py-4">
          <Text className="text-center text-sm text-sage">
            Discover a neighborhood and reach out to a homeowner to start your
            first conversation.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
