import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Animated, { FadeInDown } from "react-native-reanimated";

const CATEGORIES = [
  { id: "wedding", label: "Wedding", icon: "suit.heart.fill", color: "#E11D48" },
  { id: "birthday", label: "Birthday", icon: "gift.fill", color: "#F59E0B" },
  { id: "corporate", label: "Corporate", icon: "briefcase.fill", color: "#3B82F6" },
  { id: "party", label: "Parties", icon: "balloon.fill", color: "#8B5CF6" },
  { id: "exhibition", label: "Exhibitions", icon: "museum.fill", color: "#10B981" },
];

export function CategoryGrid({ onCategoryPress }: { onCategoryPress: (id: string) => void }) {
  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {CATEGORIES.map((cat, index) => (
          <Animated.View 
            key={cat.id}
            entering={FadeInDown.delay(index * 100).springify()}
          >
            <Pressable 
              style={styles.item}
              onPress={() => onCategoryPress(cat.id)}
            >
              <View style={[styles.iconWrapper, { backgroundColor: `${cat.color}15` }]}>
                <IconSymbol name={cat.icon as any} size={24} color={cat.color} />
              </View>
              <Text style={styles.label}>{cat.label}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 8,
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
});
