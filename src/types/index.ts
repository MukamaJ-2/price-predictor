export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minimumOrder: number;
  image: string;
  featured: boolean;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  customizations?: {
    name: string;
    options: Array<{
      name: string;
      price: number;
    }>;
  }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: Array<{
    name: string;
    selection: string;
    price: number;
  }>;
}

export interface UserAddress {
  id: number;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}