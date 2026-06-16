export interface Product {
  id: string;
  oemNumber: string;
  name: string;
  nameRu: string;
  category: 'resort' | 'offroad' | 'four_seater' | 'six_seater' | 'vintage';
  description: string;
  descriptionRu: string;
  priceEur: number;
  condition: 'new' | 'refurbished' | 'original-used';
  conditionRu: string;
  images: string[];
  specs: { [key: string]: string };
  specsRu: { [key: string]: string };
  compatibleModels: string[];
  inStock: boolean;
  isPinned?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedModelFit?: string;
  vinToCheck?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  contactMethod: 'whatsapp' | 'email' | 'telegram';
  contactValue: string;
  deliveryMethod: 'shipping' | 'pickup';
  address?: string;
  vin: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    productNameRu: string;
    oemNumber: string;
    priceEur: number;
    quantity: number;
  }[];
  totalPriceEur: number;
  shippingCostEur: number;
  status: 'pending_verification' | 'parts_found' | 'ready_for_dispatch' | 'dispatched' | 'completed';
}
