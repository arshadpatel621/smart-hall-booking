import { Card } from "@/components/ui/Card";
import { FilterChips } from "@/components/ui/FilterChips";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BackButton } from "@/components/ui/BackButton";
import { halls } from "@/data/halls";
import { useMarketplaceStore } from "@/lib/compare-store";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HallsPage() {
  const router = useRouter();
  const { addHallToCompare, addHallToCart } = useMarketplaceStore();
  const [city, setCity] = useState("All Cities");

  const cityOptions = useMemo(
    () => ["All Cities", ...new Set(halls.map((hall) => hall.city))],
    [],
  );

  const filteredHalls = useMemo(() => {
    if (city === "All Cities") return halls;
    return halls.filter((hall) => hall.city === city);
  }, [city]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerSpacer} />
        <SectionHeader
          title="Curated Venues"
          subtitle="Explore Mumbai's finest banquet halls, farmhouses, and luxury hotels."
        />
        <FilterChips options={cityOptions} selected={city} onSelect={setCity} />
        <View style={styles.list}>
          {filteredHalls.map((hall, index) => (
            <Card
              key={hall.id}
              index={index}
              title={hall.name}
              subtitle={hall.location}
              rightValue={`$${hall.pricePerSession}`}
              meta={`${hall.capacity} capacity • ${hall.rating} rating`}
              ctaLabel="View details"
              onPress={() => router.push(`/halls/${hall.id}`)}
            >
              <PriceBadge label={`${hall.city} • ${hall.amenities[0]}`} />
              <View style={styles.actions}>
                <Pressable onPress={() => addHallToCompare(hall)}>
                  <Text style={styles.actionText}>Compare</Text>
                </Pressable>
                <Pressable onPress={() => addHallToCart(hall)}>
                  <Text style={styles.actionText}>Add to plan</Text>
                </Pressable>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFDFB",
  },
  container: {
    padding: 20,
  },
  headerSpacer: {
    height: 80,
  },
  list: {
    marginTop: 20,
    gap: 16,
    paddingBottom: 40,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },
  actionText: {
    color: "#E11D48",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontSize: 12,
  },
});
