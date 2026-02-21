import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FAF7F2" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="edit"
        options={{
          headerShown: true,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
