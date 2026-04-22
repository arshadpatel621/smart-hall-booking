import { router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "@/firebaseConfig";

type HallCard = {
  id: string;
  name: string;
  location: string;
  pricePerHour: string;
  capacity: string;
  image: string;
};

const hallData: HallCard[] = [
  {
    id: "1",
    name: "Aurora Conference Hall",
    location: "Downtown Business District",
    pricePerHour: "$120/hr",
    capacity: "Up to 80 guests",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  },
  {
    id: "2",
    name: "Grand Regency Suite",
    location: "Central Avenue",
    pricePerHour: "$220/hr",
    capacity: "Up to 150 guests",
    image: "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4",
  },
];

export default function Dashboard() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserEmail(currentUser?.email ?? "");
      setLoading(false);
      if (!currentUser) {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, [fadeAnim]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f172a",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const handleLogout = () => {
    setLoggingOut(true);
    signOut(auth)
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        Alert.alert("Logout Error", err.message);
      })
      .finally(() => {
        setLoggingOut(false);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>Smart Hall</Text>
          <View style={styles.userRow}>
            <Text style={styles.profile}>Hi, {userEmail.split("@")[0] || "Guest"}</Text>
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.logoutBtn, loggingOut && styles.logoutDisabled]}
              disabled={loggingOut}
            >
              <Text style={styles.logoutText}>
                {loggingOut ? "Logging out..." : "Logout"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.hero}>
            <Text style={styles.title}>Find your next premium venue</Text>
            <Text style={styles.heroSubtitle}>
              Handpicked halls with transparent pricing and instant booking access.
            </Text>
          </View>
        </Animated.View>

        <Text style={styles.section}>Quick Filters</Text>
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Affordable</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Large Capacity</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>Recommended Halls</Text>
        {hallData.map((hall) => (
          <Animated.View
            key={hall.id}
            style={[styles.card, { opacity: fadeAnim }]}
          >
            <Image
              source={{ uri: hall.image }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{hall.name}</Text>
              <Text style={styles.meta}>{hall.location}</Text>
              <Text style={styles.meta}>{hall.capacity}</Text>
              <Text style={styles.price}>{hall.pricePerHour}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View details</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profile: {
    color: "#cbd5e1",
    fontSize: 13,
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutDisabled: {
    opacity: 0.6,
  },
  logoutText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  hero: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 16,
    marginBottom: 18,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  heroSubtitle: {
    color: "#94a3b8",
    marginTop: 8,
    lineHeight: 20,
  },
  section: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 12,
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  filterBtn: {
    backgroundColor: "#312e81",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  filterText: {
    color: "#fff",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 20,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 14,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  meta: {
    color: "#94a3b8",
    marginTop: 4,
  },
  price: {
    color: "#818cf8",
    marginTop: 8,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
