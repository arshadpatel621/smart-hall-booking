import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAuthSession } from "@/lib/auth";
import { useMarketplaceStore } from "@/lib/compare-store";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CheckoutPage() {
  const { user, loading, isAuthenticated } = useAuthSession();
  const { cartIntent, clearCart } = useMarketplaceStore();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login?redirect=/checkout");
    }
  }, [isAuthenticated, loading]);

  const total = useMemo(() => {
    const hallsTotal = cartIntent.halls.reduce((sum, hall) => sum + hall.pricePerSession, 0);
    return hallsTotal;
  }, [cartIntent.halls]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingBox}>
          <ActivityIndicator color="#818cf8" size="large" />
          <Text style={styles.loadingText}>Checking your session...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Redirecting to login...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader
          title="Checkout"
          subtitle={`Logged in as ${user?.email ?? "user"}`}
        />

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Selected Halls</Text>
          {cartIntent.halls.length === 0 ? (
            <Text style={styles.emptyText}>No halls selected yet.</Text>
          ) : (
            cartIntent.halls.map((hall) => (
              <View key={hall.id} style={styles.row}>
                <Text style={styles.rowLabel}>{hall.name}</Text>
                <Text style={styles.rowValue}>${hall.pricePerSession}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Selected Services</Text>
          {cartIntent.services.length === 0 ? (
            <Text style={styles.emptyText}>No services selected yet.</Text>
          ) : (
            cartIntent.services.map((service) => (
              <View key={service.id} style={styles.row}>
                <Text style={styles.rowLabel}>{service.name}</Text>
                <Text style={styles.rowValue}>{service.pricingModel}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Estimated Hall Total</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            clearCart();
            router.replace("/booking-success");
          }}
        >
          <Text style={styles.primaryLabel}>Place booking request</Text>
        </Pressable>
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
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#cbd5e1",
  },
  sectionBox: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyText: {
    color: "#94a3b8",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  rowLabel: {
    color: "#cbd5e1",
    flex: 1,
    marginRight: 12,
  },
  rowValue: {
    color: "#a5b4fc",
    fontWeight: "700",
  },
  totalBox: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#1f2937",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: "#e2e8f0",
    fontSize: 15,
  },
  totalValue: {
    color: "#818cf8",
    fontSize: 24,
    fontWeight: "800",
  },
  primaryButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 8,
  },
  primaryLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
