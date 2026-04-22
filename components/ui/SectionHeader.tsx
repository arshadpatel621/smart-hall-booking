import { StyleSheet, Text, View } from "react-native";

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
    maxWidth: '85%',
  },
});
