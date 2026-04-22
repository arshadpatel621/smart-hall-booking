import { ImageBackground, Pressable, StyleSheet, Text, View, TextInput, Platform } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  FadeIn,
  FadeInDown,
  withSpring
} from "react-native-reanimated";
import { useEffect } from "react";
import { IconSymbol } from "@/components/ui/icon-symbol";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
  backgroundImage?: string;
};

export function Hero({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress,
  backgroundImage,
}: HeroProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeIn.duration(1200)} style={styles.hero}>
      <ImageBackground
        source={{ uri: backgroundImage ?? "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4" }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <Text style={styles.pill}>India's Most Trusted Venue Partner</Text>
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(600).springify()}>
              <Text style={styles.title}>{title}</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(800).springify()}>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </Animated.View>

            {/* Frosted Search Bar Simulation */}
            <Animated.View 
              entering={FadeInDown.delay(1000).springify()}
              style={styles.searchContainer}
            >
              <View style={styles.searchInputWrapper}>
                <IconSymbol name="magnifyingglass" size={20} color="#64748B" />
                <TextInput 
                  placeholder="Search city, venue or vendor..." 
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                />
              </View>
              <Pressable style={styles.searchButton} onPress={onPrimaryPress}>
                <Text style={styles.searchButtonText}>Explore</Text>
              </Pressable>
            </Animated.View>

            <View style={styles.quickLinks}>
              <Text style={styles.quickLinkLabel}>Popular:</Text>
              {['Banquets', 'Farmhouses', 'Hotels'].map((label, i) => (
                <Pressable key={i} style={styles.quickLinkPill}>
                  <Text style={styles.quickLinkText}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 32,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    ...Platform.select({
      web: { height: 500 },
      default: { height: 550 }
    })
  },
  image: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0.9,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 800,
    alignSelf: "center",
  },
  pill: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    color: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 48,
    letterSpacing: -1,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 20,
    marginTop: 32,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1E293B",
  },
  searchButton: {
    backgroundColor: "#E11D48",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
  quickLinks: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  quickLinkLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  quickLinkPill: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 99,
  },
  quickLinkText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});
