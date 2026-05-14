export type OutfitType = "여성룩" | "남성룩" | "상관없음";
export type StyleType = "동네마실" | "출근" | "데이트" | "꾸안꾸";
export type DateType = "오늘" | "내일" | "이번 주말" | "직접 선택";
export type Category = "상의" | "하의" | "아우터";

export type Weather = {
  temperature: number;
  feelsLike: number;
  rainProbability: number;
  wind: number;
};

export type OutfitItem = {
  id: string;
  name: string;
  category: Category;
  gender?: "여성" | "남성";
  tags: string[];
};

export type AppState = {
  outfitType?: OutfitType;
  style?: StyleType;
  dateType?: DateType;
  customDate?: string;
  location?: string;
  weather?: Weather;
  selectedTop?: OutfitItem;
  selectedBottom?: OutfitItem;
  selectedOuter?: OutfitItem;
  selectedShoes?: string;
};
