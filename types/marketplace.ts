export type Hall = {
  id: string;
  name: string;
  city: string;
  location: string;
  pricePerSession: number;
  capacity: number;
  rating: number;
  amenities: string[];
  images: string[];
  description: string;
};

export type ServiceCategory =
  | "Photographer"
  | "Caterer"
  | "FlowerDecorator"
  | "WaterSupply"
  | "EventStaff"
  | "StageDecorator";

export type ServiceProvider = {
  id: string;
  name: string;
  category: ServiceCategory;
  city: string;
  pricingModel: string;
  rating: number;
  tags: string[];
  image: string;
  description: string;
};

export type CompareItem =
  | { type: "hall"; item: Hall }
  | { type: "service"; item: ServiceProvider };

export type CartIntent = {
  halls: Hall[];
  services: ServiceProvider[];
};
