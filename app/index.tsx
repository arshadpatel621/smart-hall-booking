import { Card } from "@/components/ui/Card";
import { Hero } from "@/components/ui/Hero";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { IconSymbol } from "@/components/ui/icon-symbol";
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
  const { addHallToCompare, compareItems } = useMarketplaceStore();
  const featuredHalls = halls.slice(0, 4);
  const featuredServices = services.slice(0, 4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.logo}>SMRT</Text>
            <Text style={styles.logoSubtile}>Hall Booking</Text>
          </View>
          <View style={styles.topBarRight}>
            <Pressable 
              style={styles.iconButton} 
              onPress={() => router.push("/compare")}
            >
              <IconSymbol name="arrow.left.arrow.right" size={20} color="#64748B" />
              {compareItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{compareItems.length}</Text>
                </View>
              )}
            </Pressable>
            <Pressable style={styles.profileButton}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
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

        <CategoryGrid onCategoryPress={(id) => router.push(`/halls?category=${id}`)} />

        <SectionHeader
          title="Featured Halls"
          subtitle="Curated venues with transparent pricing and premium amenities."
          actionLabel="View All"
          onActionPress={() => router.push("/halls")}
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {featuredHalls.map((hall, index) => (
            <View key={hall.id} style={styles.carouselItem}>
              <Card
                index={index}
                title={hall.name}
                subtitle={hall.location}
                meta={`${hall.capacity} guests • ${hall.rating}★`}
                rightValue={`$${hall.pricePerSession}`}
                ctaLabel="View details"
                onPress={() => router.push(`/halls/${hall.id}`)}
              >
                <View style={styles.cardFooter}>
                  <PriceBadge label={hall.city} />
                  <Pressable 
                    onPress={() => addHallToCompare(hall)}
                    style={styles.compareBtn}
                  >
                    <IconSymbol name="plus.circle" size={14} color="#E11D48" />
                    <Text style={styles.compareBtnText}>Compare</Text>
                  </Pressable>
                </View>
              </Card>
            </View>
          ))}
        </ScrollView>

        <StatGrid />

        <SectionHeader
          title="Top Services"
          subtitle="Everything for a complete event management experience."
          actionLabel="Explore"
          onActionPress={() => router.push("/services")}
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {featuredServices.map((service, index) => (
            <View key={service.id} style={styles.carouselItem}>
              <Card
                index={index}
                title={service.name}
                subtitle={service.category}
                meta={`${service.city} • ${service.pricingModel}`}
                rightValue={`${service.rating}★`}
                ctaLabel="Book Service"
                onPress={() => router.push("/services")}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomCta}>
          <Text style={styles.ctaHeading}>Ready to start?</Text>
          <Text style={styles.ctaSub}>Book your venue and services in minutes.</Text>
          <Pressable style={styles.checkoutButton} onPress={() => router.push("/checkout")}>
            <Text style={styles.checkoutLabel}>Proceed to Booking</Text>
          </Pressable>
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
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFDFB",
  },
  logo: {
    color: "#E11D48",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -1,
  },
  logoSubtile: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: -4,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#E11D48",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#E11D48",
    padding: 2,
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#E11D48",
    fontSize: 14,
    fontWeight: "800",
  },
  carouselContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 20,
  },
  carouselItem: {
    width: 300,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  compareBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  compareBtnText: {
    color: "#E11D48",
    fontSize: 12,
    fontWeight: "700",
  },
  bottomCta: {
    margin: 20,
    backgroundColor: "#1E293B",
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
  },
  ctaHeading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  ctaSub: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  checkoutButton: {
    backgroundColor: "#E11D48",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
