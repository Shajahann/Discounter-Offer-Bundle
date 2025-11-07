
import type { Product, Collection } from './types';

export const STEPS = [
    { title: "Core Configuration", description: "Activate the app and set global rules." },
    { title: "Tiered Pricing", description: "Create volume-based discounts." },
    { title: "Mix & Match Bundles", description: "Build custom product bundles." },
    { title: "Cart Goal Progress Bar", description: "Incentivize customers in the cart." },
    { title: "Free Gift with Purchase", description: "Set up automatic free gifts." },
    { title: "BOGO Offer", description: "Configure Buy One, Get One promotions." },
    { title: "Dashboard & Review", description: "Review and test your offers." },
];

export const MOCK_PRODUCTS: Product[] = [
    { id: 'prod_1', name: 'Organic Cotton T-Shirt', price: 25.00 },
    { id: 'prod_2', name: 'Slim Fit Denim Jeans', price: 79.99 },
    { id: 'prod_3', name: 'Leather Ankle Boots', price: 120.00 },
    { id: 'prod_4', name: 'Classic Chronograph Watch', price: 250.00 },
    { id: 'prod_5', name: 'Canvas Backpack', price: 55.50 },
    { id: 'prod_6', name: 'Polarized Aviator Sunglasses', price: 95.00 },
];

export const MOCK_COLLECTIONS: Collection[] = [
    { id: 'col_1', name: 'Summer Collection' },
    { id: 'col_2', name: 'New Arrivals' },
    { id: 'col_3', name: 'Menswear' },
    { id: 'col_4', name: 'Accessories' },
];
