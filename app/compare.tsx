import { SectionHeader } from "@/components/ui/SectionHeader";
import { useMarketplaceStore } from "@/lib/compare-store";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ComparePage() {
  const router = useRouter();
  const { compareItems, removeCompareItem, clearCompare } = useMarketplaceStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader
          title="Compare Options"
          subtitle="Compare halls and services side by side before booking."
        />

        {compareItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No items in compare list</Text>
            <Text style={styles.emptyText}>Add halls or services from listing pages.</Text>
            <Pressable style={styles.primaryButton} onPress={() => router.push("/halls")}>
              <Text style={styles.primaryLabel}>Explore halls</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {compareItems.map((compareItem) => (
              <View key={compareItem.item.id} style={styles.compareCard}>
                <View style={styles.row}>
                  <Text style={styles.typeLabel}>
                    {compareItem.type === "hall" ? "Hall" : "Service"}
                  </Text>
                  <Pressable onPress={() => removeCompareItem(compareItem.item.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
                <Text style={styles.name}>{compareItem.item.name}</Text>
                {"location" in compareItem.item ? (
                  <>
                    <Text style={styles.meta}>Location: {compareItem.item.location}</Text>
                    <Text style={styles.meta}>Price: ${compareItem.item.pricePerSession}</Text>
                    <Text style={styles.meta}>Capacity: {compareItem.item.capacity}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.meta}>Category: {compareItem.item.category}</Text>
                    <Text style={styles.meta}>Pricing: {compareItem.item.pricingModel}</Text>
                    <Text style={styles.meta}>City: {compareItem.item.city}</Text>
                  </>
                )}
              </View>
            ))}

            <View style={styles.footerActions}>
              <Pressable style={styles.secondaryButton} onPress={clearCompare}>
                <Text style={styles.secondaryLabel}>Clear compare</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={() => router.push("/checkout")}>
                <Text style={styles.primaryLabel}>Proceed to booking</Text>
              </Pressable>
            </View>
          </>
        )}
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
    paddingBottom: 28,
  },
  emptyBox: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  emptyTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
  },
  emptyText: {
    color: "#94a3b8",
  },
  compareCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeLabel: {
    color: "#a5b4fc",
    fontWeight: "700",
  },
  removeText: {
    color: "#fda4af",
    fontWeight: "600",
  },
  name: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  meta: {
    color: "#cbd5e1",
    marginTop: 4,
  },
  footerActions: {
    marginTop: 14,
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
