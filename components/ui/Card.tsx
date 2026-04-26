import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { Image } from "expo-image";
import Animated, { 
  FadeInDown, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from "react-native-reanimated";

type CardProps = {
  title: string;
  subtitle: string;
  meta: string;
  rightValue?: string;
  ctaLabel?: string;
  onPress?: () => void;
  children?: ReactNode;
  index?: number;
  imageUrl?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Card({
  title,
  subtitle,
  meta,
  rightValue,
  ctaLabel,
  onPress,
  children,
  index = 0,
  imageUrl,
}: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.98);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable 
      entering={FadeInDown.delay(index * 100).springify().damping(18)}
      style={[styles.card, animatedStyle]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl ?? "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4" }} 
          style={styles.cardImage}
          contentFit="cover"
          transition={500}
        />
        <View style={styles.imageOverlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{meta.split('•')[0].trim()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.locationWrapper}>
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
          </View>
          {rightValue && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>{rightValue}</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.content}>{children}</View>

        {ctaLabel && (
          <View style={styles.footer}>
            <Text style={styles.ctaText}>{ctaLabel}</Text>
            <View style={styles.arrowIcon}>
               {/* Arrow icon can be added here or just leave text for minimalist look */}
            </View>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0F172A",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  body: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    backgroundColor: "#FFF1F2",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  priceLabel: {
    color: "#E11D48",
    fontSize: 18,
    fontWeight: "900",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 16,
  },
  content: {
    gap: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  ctaText: {
    color: "#E11D48",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  arrowIcon: {
    // Styling for arrow icon
  }
});
