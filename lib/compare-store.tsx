import type { CartIntent, CompareItem, Hall, ServiceProvider } from "@/types/marketplace";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type MarketplaceStore = {
  compareItems: CompareItem[];
  cartIntent: CartIntent;
  addHallToCompare: (hall: Hall) => void;
  addServiceToCompare: (service: ServiceProvider) => void;
  removeCompareItem: (id: string) => void;
  clearCompare: () => void;
  addHallToCart: (hall: Hall) => void;
  addServiceToCart: (service: ServiceProvider) => void;
  clearCart: () => void;
};

const MarketplaceContext = createContext<MarketplaceStore | null>(null);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
  const [cartIntent, setCartIntent] = useState<CartIntent>({ halls: [], services: [] });

  const addHallToCompare = (hall: Hall) => {
    setCompareItems((prev) => {
      const exists = prev.some((item) => item.type === "hall" && item.item.id === hall.id);
      if (exists) return prev;
      return [...prev, { type: "hall", item: hall }];
    });
  };

  const addServiceToCompare = (service: ServiceProvider) => {
    setCompareItems((prev) => {
      const exists = prev.some((item) => item.type === "service" && item.item.id === service.id);
      if (exists) return prev;
      return [...prev, { type: "service", item: service }];
    });
  };

  const removeCompareItem = (id: string) => {
    setCompareItems((prev) => prev.filter((item) => item.item.id !== id));
  };

  const clearCompare = () => setCompareItems([]);

  const addHallToCart = (hall: Hall) => {
    setCartIntent((prev) => {
      if (prev.halls.some((item) => item.id === hall.id)) return prev;
      return { ...prev, halls: [...prev.halls, hall] };
    });
  };

  const addServiceToCart = (service: ServiceProvider) => {
    setCartIntent((prev) => {
      if (prev.services.some((item) => item.id === service.id)) return prev;
      return { ...prev, services: [...prev.services, service] };
    });
  };

  const clearCart = () => setCartIntent({ halls: [], services: [] });

  const value = useMemo(
    () => ({
      compareItems,
      cartIntent,
      addHallToCompare,
      addServiceToCompare,
      removeCompareItem,
      clearCompare,
      addHallToCart,
      addServiceToCart,
      clearCart,
    }),
    [compareItems, cartIntent],
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplaceStore() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplaceStore must be used within MarketplaceProvider");
  }
  return context;
}
