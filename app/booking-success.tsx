import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BookingSuccessPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.title}>Booking Request Submitted</Text>
        <Text style={styles.subtitle}>
          Your request has been sent to venue and service providers. We will notify you soon.
        </Text>

        <Pressable style={styles.primaryButton} onPress={() => router.replace("/")}>
          <Text style={styles.primaryLabel}>Back to marketplace</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#030712",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 18,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 10,
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 13,
  },
  primaryLabel: {
    color: "#fff",
    fontWeight: "700",
  },
});
