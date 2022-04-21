export interface IRegistryCategory {
  CategoryId: number;
  CategoryName: string;
}

export interface IRegistryItem {
  ItemId: number;
  ItemName: string;
  ItemDescription: string;
  ItemImageURL: string;
  ItemPurchaseURL: string;
  EstimatedPrice: string;
  RawPrice: number;
  CategoryName?: string;
  ItemClaims?: number;
  AmountDesired?: number;
  IsExact?: boolean;
}

export interface IRegistryGiftFund {
  GiftFundId: number;
  GiftFundName: string;
  GiftFundDescription: string;
  GiftFundGoal: number;
  GiftFundAccrued: number;
  GiftFundURL: string;
}