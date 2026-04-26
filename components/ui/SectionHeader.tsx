import { Pressable, StyleSheet, Text, View } from "react-native";

export function SectionHeader({ 
  title, 
  subtitle,
  actionLabel,
  onActionPress 
}: { 
  title: string; 
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {actionLabel && onActionPress && (
          <Pressable onPress={onActionPress} style={styles.actionButton}>
            <Text style={styles.actionText}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#1E293B",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    maxWidth: '90%',
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    color: "#E11D48",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
