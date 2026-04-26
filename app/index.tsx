import { Card } from "@/components/ui/Card";
import { Hero } from "@/components/ui/Hero";
import { PriceBadge } from "@/components/ui/PriceBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { CategorySlider } from "@/components/ui/CategorySlider";
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
  StatusBar,
} from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function HomePage() {
  const router = useRouter();
  const { addHallToCompare, compareItems } = useMarketplaceStore();
  const featuredHalls = halls.slice(0, 3);
  const popularServices = services.slice(0, 4);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Premium Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>S</Text>
          </View>
          <Text style={styles.logoText}>SmartHall</Text>
        </View>
        <View style={styles.topBarActions}>
          <Pressable 
            style={styles.iconButton} 
            onPress={() => router.push("/compare")}
          >
            <IconSymbol name="arrow.left.and.right.circle" size={24} color="#1E293B" />
            {compareItems.length > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{compareItems.length}</Text>
              </View>
            )}
          </Pressable>
          <Pressable 
            style={styles.profileButton}
            onPress={() => router.push("/login")}
          >
            <IconSymbol name="person.circle" size={24} color="#1E293B" />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Hero
          title="Exceptional Venues for Your Life's Best Moments"
          subtitle="Discover curated banquets, farmhouses and premium event services with transparent pricing."
          primaryLabel="Search"
          secondaryLabel="View All"
          onPrimaryPress={() => router.push("/halls")}
          onSecondaryPress={() => router.push("/services")}
        />

        <View style={styles.section}>
          <SectionHeader
            title="Browse by Category"
            subtitle="Explore our wide range of event spaces and services"
          />
          <CategorySlider />
        </View>

        <View style={styles.statsContainer}>
          <StatGrid />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeadingWrapper}>
             <SectionHeader
              title="Handpicked Venues"
              subtitle="Luxury event spaces with high ratings"
            />
            <Pressable onPress={() => router.push("/halls")}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalGrid}
          >
            {featuredHalls.map((hall, index) => (
              <View key={hall.id} style={styles.horizontalCardWrapper}>
                <Card
                  index={index}
                  title={hall.name}
                  subtitle={hall.location}
                  meta={`${hall.capacity} guests • ${hall.rating}★`}
                  rightValue={`$${hall.pricePerSession}`}
                  ctaLabel="View Details"
                  imageUrl={hall.image}
                  onPress={() => router.push(`/halls/${hall.id}`)}
                >
                  <PriceBadge label={`Premium Choice`} />
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
           <View style={styles.sectionHeadingWrapper}>
            <SectionHeader
              title="Professional Services"
              subtitle="Top-rated vendors for your event"
            />
             <Pressable onPress={() => router.push("/services")}>
              <Text style={styles.viewAllText}>Explore All</Text>
            </Pressable>
          </View>
          
          <View style={styles.verticalGrid}>
            {popularServices.map((service, index) => (
              <Card
                key={service.id}
                index={index}
                title={service.name}
                subtitle={service.category}
                meta={`${service.city} • ${service.pricingModel}`}
                rightValue={`${service.rating}★`}
                ctaLabel="Book Service"
                imageUrl={service.image}
                onPress={() => router.push("/services")}
              />
            ))}
          </View>
        </View>

        <View style={styles.footerCTA}>
          <View style={styles.ctaBlur}>
            <Text style={styles.ctaTitle}>Ready to Host?</Text>
            <Text style={styles.ctaSubtitle}>Book your ideal venue and services in minutes.</Text>
            <Pressable 
              style={styles.primaryButton}
              onPress={() => router.push("/checkout")}
            >
              <Text style={styles.primaryButtonText}>Plan Your Event</Text>
            </Pressable>
          </View>
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
  topBar: {
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFDFB",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E11D48",
    justifyContent: "center",
    alignItems: "center",
  },
  logoIconText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  topBarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  badgeCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E11D48',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFDFB',
  },
  badgeCountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  profileButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
  },
  sectionHeadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  viewAllText: {
    color: '#E11D48',
    fontSize: 14,
    fontWeight: '700',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  horizontalGrid: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 10,
  },
  horizontalCardWrapper: {
    width: 280,
  },
  verticalGrid: {
    paddingHorizontal: 20,
    gap: 4,
  },
  footerCTA: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  ctaBlur: {
    backgroundColor: "#0F172A",
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
  },
  ctaTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8,
  },
  ctaSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  primaryButton: {
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
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
