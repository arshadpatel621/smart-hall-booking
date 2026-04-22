import { Stack } from "expo-router";
import { MarketplaceProvider } from "@/lib/compare-store";

export default function RootLayout() {
  return (
    <MarketplaceProvider>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="index"
      />
    </MarketplaceProvider>
  );
}
