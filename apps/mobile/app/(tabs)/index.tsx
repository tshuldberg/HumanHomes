import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

function StoryCard({
  quote,
  author,
  location,
}: {
  quote: string;
  author: string;
  location: string;
}) {
  return (
    <View className="mr-4 w-72 rounded-2xl bg-white p-5 shadow-sm">
      <View className="mb-4 h-36 items-center justify-center rounded-xl bg-sage/20">
        <Ionicons name="home-outline" size={40} color="#8B9F82" />
      </View>
      <Text className="text-sm italic leading-5 text-charcoal/80">
        "{quote}"
      </Text>
      <Text className="mt-3 text-xs font-medium text-terracotta">
        -- {author}, {location}
      </Text>
    </View>
  );
}

function NeighborhoodCard({
  name,
  tagline,
  tags,
}: {
  name: string;
  tagline: string;
  tags: string[];
}) {
  return (
    <Pressable className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
      <View className="mb-3 h-32 items-center justify-center rounded-xl bg-terracotta/10">
        <Ionicons name="map-outline" size={36} color="#C4704B" />
      </View>
      <Text className="font-serif text-lg font-bold text-charcoal">
        {name}
      </Text>
      <Text className="mt-1 text-sm leading-5 text-charcoal/60">
        {tagline}
      </Text>
      <View className="mt-3 flex-row flex-wrap gap-2">
        {tags.map((tag) => (
          <View key={tag} className="rounded-full bg-sage/15 px-3 py-1">
            <Text className="text-xs font-medium text-sage">{tag}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export default function DiscoverScreen() {
  const { user } = useUser();
  const greeting = user?.firstName ? `Welcome, ${user.firstName}` : "Welcome";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-warm-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-4 pb-2">
          <Text className="text-sm font-medium text-terracotta">
            {greeting}
          </Text>
          <Text className="mt-1 font-serif text-2xl font-bold leading-8 text-charcoal">
            Discover homes{"\n"}in your area
          </Text>
        </View>

        <View className="mt-4">
          <Text className="px-6 mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal/40">
            Home Stories
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-6"
          >
            <StoryCard
              quote="We planted that lemon tree the day we moved in. It's taller than the kids now."
              author="Maria"
              location="Oakland"
            />
            <StoryCard
              quote="The crows bring us gifts every morning on this porch. We keep them in a jar by the door."
              author="David"
              location="Portland"
            />
            <StoryCard
              quote="She took her first steps right here, in the living room, on a Sunday morning."
              author="Anh"
              location="San Francisco"
            />
          </ScrollView>
        </View>

        <View className="mt-8 px-6">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal/40">
            Neighborhoods Near You
          </Text>
          <NeighborhoodCard
            name="Temescal, Oakland"
            tagline="A tight-knit community of families, artists, and longtime residents who know each other by name."
            tags={["Walkable", "Community Gardens", "Local Shops"]}
          />
          <NeighborhoodCard
            name="Sellwood, Portland"
            tagline="Every block has a little free library. The farmers market is walking distance."
            tags={["Yard Space", "Family-Friendly", "Quiet Streets"]}
          />
          <NeighborhoodCard
            name="Noe Valley, San Francisco"
            tagline="Strollers on every sidewalk, sunshine most afternoons, and a bakery on every corner."
            tags={["Walkable", "Family-Friendly", "Close to Nature"]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
