import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-warm-white">
        <ActivityIndicator size="large" color="#C4704B" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C4704B",
        tabBarInactiveTintColor: "#2D2D2D",
        tabBarStyle: {
          backgroundColor: "#FAF7F2",
          borderTopColor: "#2D2D2D1A",
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter",
          fontSize: 11,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#FAF7F2",
        },
        headerTintColor: "#2D2D2D",
        headerTitleStyle: {
          fontFamily: "Georgia",
          fontWeight: "bold" as const,
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
