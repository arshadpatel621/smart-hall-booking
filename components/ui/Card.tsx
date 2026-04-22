import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

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
  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify().damping(18)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl ?? "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4" }} 
          style={styles.cardImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.metaBadge}>{meta.split('•')[0]}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          {rightValue && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>{rightValue}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>{children}</View>

        {ctaLabel && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>{ctaLabel}</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
      },
    }),
  },
  imageContainer: {
    height: 180,
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  metaBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 99,
    fontSize: 11,
    fontWeight: "700",
    color: "#E11D48",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  body: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    color: "#1E293B",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },
  priceContainer: {
    backgroundColor: "#FFF1F2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  priceLabel: {
    color: "#E11D48",
    fontSize: 16,
    fontWeight: "800",
  },
  content: {
    gap: 8,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: "#E11D48",
  },
  buttonPressed: {
    backgroundColor: "#FFF1F2",
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#E11D48",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
