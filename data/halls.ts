import type { Hall } from "@/types/marketplace";

export const halls: Hall[] = [
  {
    id: "aurora-conference-hall",
    name: "Aurora Conference Hall",
    city: "Hyderabad",
    location: "Downtown, Jubilee Hills",
    pricePerSession: 1200,
    capacity: 250,
    rating: 4.9,
    amenities: ["Gigabit WiFi", "Valet Parking", "AC", "LED Wall"],
    images: [
      "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    ],
    description:
      "A premium conference-ready venue with modern lighting and flexible seating.",
  },
  {
    id: "grand-regency-suite",
    name: "Grand Regency Suite",
    city: "Hyderabad",
    location: "Banjara Hills, Road No. 10",
    pricePerSession: 3500,
    capacity: 500,
    rating: 4.7,
    amenities: ["Fine Dining Setup", "Parking", "Bridal Suite", "Premium Decor"],
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    ],
    description:
      "Elegant ballroom for weddings and large-scale celebrations with full-service support.",
  },
  {
    id: "emerald-garden-hall",
    name: "Emerald Garden Hall",
    city: "Bengaluru",
    location: "Koramangala 5th Block",
    pricePerSession: 1800,
    capacity: 320,
    rating: 4.8,
    amenities: ["Garden Access", "Live Counter Zone", "Generator Backup"],
    images: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330",
      "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4",
    ],
    description:
      "Nature-inspired event venue perfect for receptions, parties, and corporate evenings.",
  },
];
