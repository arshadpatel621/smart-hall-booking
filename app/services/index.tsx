import { Card } from "@/components/ui/Card";
import { FilterChips } from "@/components/ui/FilterChips";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BackButton } from "@/components/ui/BackButton";
import { services } from "@/data/services";
import { useMarketplaceStore } from "@/lib/compare-store";
import type { ServiceCategory } from "@/types/marketplace";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const allCategories: (ServiceCategory | "All")[] = [
  "All",
  "Photographer",
  "Caterer",
  "FlowerDecorator",
  "WaterSupply",
  "EventStaff",
  "StageDecorator",
];

export default function ServicesPage() {
  const { addServiceToCompare, addServiceToCart } = useMarketplaceStore();
  const [category, setCategory] = useState<ServiceCategory | "All">("All");

  const filtered = useMemo(() => {
    if (category === "All") return services;
    return services.filter((service) => service.category === category);
  }, [category]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerSpacer} />
        <SectionHeader
          title="Premium Vendors"
          subtitle="Discover India's top-rated photographers, caterers, and decorators."
        />
        <FilterChips options={allCategories} selected={category} onSelect={(value) => setCategory(value as ServiceCategory | "All")} />
        <View style={styles.list}>
          {filtered.map((service, index) => (
            <Card
              key={service.id}
              index={index}
              title={service.name}
              subtitle={service.category}
              meta={`${service.city} • ${service.pricingModel}`}
              rightValue={`${service.rating}★`}
            >
              <Text style={styles.description}>{service.description}</Text>
              <View style={styles.actions}>
                <Pressable onPress={() => addServiceToCompare(service)}>
                  <Text style={styles.actionText}>Compare</Text>
                </Pressable>
                <Pressable onPress={() => addServiceToCart(service)}>
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
  description: {
    color: "#64748B",
    marginTop: 8,
    lineHeight: 20,
    fontSize: 14,
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
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
