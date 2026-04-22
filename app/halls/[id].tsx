import { PriceBadge } from "@/components/ui/PriceBadge";
import { halls } from "@/data/halls";
import { useMarketplaceStore } from "@/lib/compare-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HallDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addHallToCompare, addHallToCart } = useMarketplaceStore();
  const hall = halls.find((entry) => entry.id === id);

  if (!hall) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.title}>Hall not found</Text>
          <Pressable style={styles.primaryButton} onPress={() => router.replace("/halls")}>
            <Text style={styles.primaryLabel}>Back to halls</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: hall.images[0] }} style={styles.image} />
        <Text style={styles.title}>{hall.name}</Text>
        <Text style={styles.subtitle}>{hall.location}</Text>
        <PriceBadge label={`${hall.city} • ${hall.rating}★`} />

        <View style={styles.stats}>
          <Text style={styles.stat}>Price: ${hall.pricePerSession}</Text>
          <Text style={styles.stat}>Capacity: {hall.capacity} guests</Text>
        </View>

        <Text style={styles.description}>{hall.description}</Text>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.chips}>
          {hall.amenities.map((amenity) => (
            <View key={amenity} style={styles.chip}>
              <Text style={styles.chipText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.secondaryButton} onPress={() => addHallToCompare(hall)}>
            <Text style={styles.secondaryLabel}>Compare hall</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={() => addHallToCart(hall)}>
            <Text style={styles.primaryLabel}>Add to booking plan</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#030712",
  },
  container: {
    padding: 18,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    gap: 16,
  },
  image: {
    width: "100%",
    height: 230,
    borderRadius: 18,
  },
  title: {
    color: "#f8fafc",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 14,
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 4,
  },
  stats: {
    marginTop: 16,
    gap: 5,
  },
  stat: {
    color: "#e2e8f0",
    fontSize: 16,
  },
  description: {
    color: "#cbd5e1",
    marginTop: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#1e293b",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    color: "#cbd5e1",
  },
  actions: {
    marginTop: 22,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 13,
  },
  primaryLabel: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#4f46e5",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 13,
  },
  secondaryLabel: {
    color: "#c7d2fe",
    fontWeight: "600",
  },
});
