import { Pressable, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BlurView } from "expo-blur";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export function BackButton() {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.9);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    router.back();
  };

  const ButtonContent = (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.button}
    >
      <IconSymbol name="chevron.left" size={24} color="#E11D48" />
    </Pressable>
  );

  return (
    <Animated.View style={[styles.container, animatedStyle, styles.viewContainer]}>
      {ButtonContent}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
    borderRadius: 25,
    overflow: "hidden",
    ...Platform.select({
      web: {
        top: 20,
      }
    })
  },
  viewContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
