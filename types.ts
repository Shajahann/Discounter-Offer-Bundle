
export enum AppStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export enum DiscountBehavior {
    Best = 'Apply the single best discount',
    Stack = 'Allow stacking discounts',
}

export interface Settings {
    appStatus: AppStatus;
    discountBehavior: DiscountBehavior;
}

export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface Collection {
    id: string;
    name: string;
}

export interface Tier {
    quantity: number;
    discount: number; // Percentage
}

export enum TargetingType {
    Products = 'Specific Products',
    Collections = 'Specific Collections',
    All = 'All Products',
}

export interface TieredPricingOffer {
    id: string;
    targetingType: TargetingType;
    targets: string[]; // IDs of products or collections
    tiers: Tier[];
    showSelector: boolean;
}

export interface MixMatchBundle {
    id: string;
    name: string;
    price: number;
    products: string[]; // IDs of eligible products
    minProducts: number;
    maxProducts: number;
}

export enum CartGoalType {
    FreeShipping = 'Free Shipping',
    FreeGift = 'Free Gift',
}

export interface CartGoal {
    id: string;
    type: CartGoalType;
    threshold: number; // Cart value
    giftProductId?: string;
    headline: string;
    message: string;
    color: string;
}

export enum FreeGiftRuleType {
    CartValue = 'Cart Value',
    ProductQuantity = 'Product Quantity',
}

export interface FreeGiftOffer {
    id: string;
    ruleType: FreeGiftRuleType;
    threshold: number; // Cart value or quantity
    targetCollectionId?: string;
    giftProductId: string;
    autoAddToCart: boolean;
}

export interface BogoTier {
    buyQuantity: number;
    getQuantity: number;
    getDiscount: number; // Percentage
}

export interface BogoOffer {
    id: string;
    buyTargetingType: TargetingType;
    buyTargets: string[];
    getTargetingType: TargetingType;
    getTargets: string[];
    tiers: BogoTier[];
}
