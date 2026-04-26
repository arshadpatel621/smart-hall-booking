import { ImageBackground, Pressable, StyleSheet, Text, View, TextInput, Platform } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
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
  onPrimaryPress,
  backgroundImage,
}: HeroProps) {
  const scale = useSharedValue(1);

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
              <View style={styles.pillContainer}>
                <View style={styles.dot} />
                <Text style={styles.pillText}>India's No. 1 Venue Platform</Text>
              </View>
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(600).springify()}>
              <Text style={styles.title}>{title}</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(800).springify()}>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </Animated.View>

            {/* Premium Search Bar */}
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
                <Text style={styles.searchButtonText}>Search</Text>
              </Pressable>
            </Animated.View>

            <View style={styles.quickLinks}>
              <Text style={styles.quickLinkLabel}>Trending:</Text>
              {['Rooftop', 'Poolside', 'Grand Hall'].map((label, i) => (
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
      web: { height: 480 },
      default: { height: 520 }
    })
  },
  image: {
    flex: 1,
  },
  imageStyle: {
    opacity: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 800,
    alignSelf: "center",
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981', // Green dot for "Active/Trusted"
    marginRight: 8,
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 50,
    letterSpacing: -1.5,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 14,
    lineHeight: 24,
    fontWeight: "500",
    maxWidth: '90%',
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderRadius: 24,
    marginTop: 36,
    width: "100%",
    maxWidth: 520,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
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
    color: "#0F172A",
    ...Platform.select({
      web: { outlineStyle: 'none' }
    })
  },
  searchButton: {
    backgroundColor: "#E11D48",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 18,
    shadowColor: "#E11D48",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  quickLinks: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 12,
  },
  quickLinkLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
    fontWeight: "600",
  },
  quickLinkPill: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickLinkText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
