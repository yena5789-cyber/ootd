import { outfitItems, styleBoostMap } from "@/lib/outfit-config";
import { Category, OutfitItem, StyleType, Weather } from "@/lib/types";
import { getOuterwearNeed, isWindHigh } from "@/lib/weather";

const baseMatchMap: Record<Category, Category> = {
  상의: "하의",
  하의: "아우터",
  아우터: "상의",
};

export const recommendStartCategory = (weather: Weather): Category => {
  const need = getOuterwearNeed(weather);
  if (["strong", "coat", "padding"].includes(need)) return "아우터";
  if (weather.rainProbability > 50) return "아우터";
  return "상의";
};

const getReason = (item: OutfitItem, weather: Weather): string => {
  if (item.category === "아우터") {
    if (item.name === "패딩") return "강한 추위에 필수예요";
    if (item.name.includes("코트")) return "쌀쌀한 날씨 보온에 적합해요";
    if (item.name === "바람막이") return "비/바람 대응에 좋아요";
    return "선선한 날씨에 적합해요";
  }

  if (item.category === "하의" && weather.rainProbability > 50 && item.name === "미니스커트") {
    return "비 예보로 우선순위가 낮아요";
  }

  if (item.tags.includes("출근")) return "오늘 스타일 분위기에 잘 맞아요";
  return "데일리로 매치하기 좋아요";
};

export const recommendNextItems = ({
  selectedItem,
  style,
  weather,
}: {
  selectedItem: OutfitItem;
  style: StyleType;
  weather: Weather;
}): Array<{ item: OutfitItem; reason: string; score: number }> => {
  const targetCategory = baseMatchMap[selectedItem.category];

  let pool = outfitItems.filter((item) => item.category === targetCategory);

  pool = pool.map((item) => {
    let score = 50;

    if (styleBoostMap[style]?.includes(item.name)) {
      score += 25;
    }

    if (weather.rainProbability > 50 && item.name === "미니스커트") {
      score -= 40;
    }

    if (weather.rainProbability > 50 && item.name === "바람막이") {
      score += 20;
    }

    if (isWindHigh(weather) && item.name === "가디건") {
      score -= 30;
    }

    const outerNeed = getOuterwearNeed(weather);
    if (targetCategory === "아우터") {
      if (outerNeed === "padding" && item.name === "패딩") score += 60;
      if (outerNeed === "coat" && item.name.includes("코트")) score += 40;
      if (outerNeed === "none") score -= 30;
      if (outerNeed === "light" && ["가디건", "자켓", "바람막이"].includes(item.name)) score += 20;
    }

    return { item, reason: getReason(item, weather), score };
  });

  return pool.sort((a, b) => b.score - a.score).slice(0, 3);
};
