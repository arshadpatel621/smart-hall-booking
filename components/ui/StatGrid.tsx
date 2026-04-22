import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Animated, { FadeInRight } from "react-native-reanimated";

const STATS = [
  { id: 1, label: "Premium Venues", value: "500+", icon: "building.2.fill" },
  { id: 2, label: "Happy Couples", value: "25k+", icon: "person.2.fill" },
  { id: 3, label: "Top Rated", value: "4.9/5", icon: "star.fill" },
  { id: 4, label: "Verified Leads", value: "100k+", icon: "map.fill" },
];

export function StatGrid() {
  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {STATS.map((stat, index) => (
          <Animated.View 
            key={stat.id}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.card}
          >
            <View style={styles.iconContainer}>
              <IconSymbol name={stat.icon as any} size={20} color="#E11D48" />
            </View>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 20,
    minWidth: 140,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFF1F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
  },
  label: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    fontWeight: "500",
  },
});
