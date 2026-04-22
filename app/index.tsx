import { Card } from "@/components/ui/Card";
import { Hero } from "@/components/ui/Hero";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { halls } from "@/data/halls";
import { services } from "@/data/services";
import { useMarketplaceStore } from "@/lib/compare-store";
import { useRouter } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";

export default function HomePage() {
  const router = useRouter();
  const { addHallToCompare, addServiceToCompare, compareItems } = useMarketplaceStore();
  const featuredHalls = halls.slice(0, 2);
  const featuredServices = services.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>Smart Hall</Text>
          <View style={styles.topBarLinks}>
            <Pressable onPress={() => router.push("/halls")}>
              <Text style={styles.linkText}>Explore</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/services")}>
              <Text style={styles.linkText}>Services</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/compare")}>
              <Text style={styles.linkText}>Compare ({compareItems.length})</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.linkText}>Login</Text>
            </Pressable>
          </View>
        </View>

        <Hero
          title="Plan Your Dream Event in Mumbai"
          subtitle="Discover India's most curated venues and premium event vendors. Your journey to a perfect celebration starts here."
          primaryLabel="Find Venues"
          secondaryLabel="View Vendors"
          onPrimaryPress={() => router.push("/halls")}
          onSecondaryPress={() => router.push("/services")}
        />

        <StatGrid />

        <SectionHeader
          title="Featured Halls"
          subtitle="Curated venues with transparent pricing and premium amenities."
        />
        <View style={styles.grid}>
          {featuredHalls.map((hall, index) => (
            <Card
              key={hall.id}
              index={index}
              title={hall.name}
              subtitle={hall.location}
              meta={`${hall.capacity} guests • ${hall.rating} rating`}
              rightValue={`$${hall.pricePerSession}`}
              ctaLabel="View details"
              onPress={() => router.push(`/halls/${hall.id}`)}
            >
              <PriceBadge label={`In ${hall.city}`} />
              <View style={styles.inlineActions}>
                <Pressable onPress={() => addHallToCompare(hall)}>
                  <Text style={styles.inlineActionText}>Add to compare</Text>
                </Pressable>
              </View>
            </Card>
          ))}
        </View>

        <SectionHeader
          title="Popular Services"
          subtitle="Everything needed for a complete event management experience."
        />
        <View style={styles.grid}>
          {featuredServices.map((service, index) => (
            <Card
              key={service.id}
              index={index}
              title={service.name}
              subtitle={service.category}
              meta={`${service.city} • ${service.pricingModel}`}
              rightValue={`${service.rating}★`}
              ctaLabel="Explore provider"
              onPress={() => router.push("/services")}
            >
              <View style={styles.inlineActions}>
                <Pressable onPress={() => addServiceToCompare(service)}>
                  <Text style={styles.inlineActionText}>Compare</Text>
                </Pressable>
              </View>
            </Card>
          ))}
        </View>

        <Pressable style={styles.checkoutButton} onPress={() => router.push("/checkout")}>
          <Text style={styles.checkoutLabel}>Proceed to Booking</Text>
        </Pressable>
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
    gap: 12,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 12,
  },
  logo: {
    color: "#E11D48",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  topBarLinks: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  linkText: {
    color: "#64748B",
    fontWeight: "700",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  grid: {
    gap: 16,
    marginBottom: 20,
  },
  inlineActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  inlineActionText: {
    color: "#E11D48",
    fontWeight: "800",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  checkoutButton: {
    backgroundColor: "#E11D48",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 18,
    marginTop: 12,
    marginBottom: 40,
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutLabel: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
