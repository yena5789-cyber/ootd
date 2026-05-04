import { outfitItems, styleBoostMap } from "@/lib/outfit-config";
import { Category, OutfitItem, StyleType, Weather } from "@/lib/types";
import { getOuterwearNeed, isWindHigh } from "@/lib/weather";

const baseMatchMap: Record<Category, Category> = {
  상의: "하의",
  하의: "아우터",
  아우터: "상의",
};

const itemFlavorReason: Record<string, string> = {
  반팔: "활동감 있고 산뜻한 인상을 줘요",
  긴팔티: "아침저녁 기온차에 안정적인 선택이에요",
  셔츠: "단정해서 출근/약속 모두 커버돼요",
  니트: "부드러운 텍스처로 포근한 무드가 나요",
  맨투맨: "꾸민 듯 안 꾸민 듯 자연스러운 분위기예요",
  후드: "편안하고 캐주얼한 실루엣이 장점이에요",
  블라우스: "얼굴 톤이 화사해 보이는 아이템이에요",
  크롭탑: "비율이 좋아 보이고 트렌디해요",
  카라티: "깔끔함과 캐주얼의 균형이 좋아요",
  데님: "어떤 상의에도 실패 확률이 낮아요",
  슬랙스: "실루엣이 정돈돼 보이고 포멀해요",
  와이드팬츠: "체형 커버가 좋아 편하게 입기 좋아요",
  조거팬츠: "활동성과 편안함이 최고예요",
  롱스커트: "움직일 때 라인이 예쁘게 살아나요",
  미니스커트: "경쾌하고 발랄한 포인트가 돼요",
  레깅스: "가볍고 활동적인 일정에 잘 맞아요",
  가디건: "실내외 온도차 대응에 유연해요",
  자켓: "전체 코디를 깔끔하게 마무리해줘요",
  블루종: "캐주얼하면서도 스타일 포인트가 돼요",
  트렌치코트: "간절기 무드를 가장 잘 살려줘요",
  숏코트: "비율이 좋아 보이고 세련돼요",
  롱코트: "보온과 분위기를 동시에 챙겨줘요",
  패딩: "체온 유지에 가장 확실한 선택이에요",
  바람막이: "바람/약한 비 대비에 효율적이에요",
  후리스: "가볍지만 체감 보온이 좋은 편이에요",
};

export const recommendStartCategory = (weather: Weather): Category => {
  const need = getOuterwearNeed(weather);
  if (["strong", "coat", "padding"].includes(need)) return "아우터";
  if (weather.rainProbability > 50) return "아우터";
  return "상의";
};

export const getStartingOptions = ({
  startCategory,
  style,
  weather,
}: {
  startCategory: Category;
  style: StyleType;
  weather: Weather;
}): Array<{ item: OutfitItem; reason: string }> => {
  const base = outfitItems.filter((item) => item.category === startCategory);

  const ranked = base
    .map((item) => {
      let score = 40;
      if (styleBoostMap[style]?.includes(item.name)) score += 20;
      if (weather.feelsLike >= 23 && ["니트", "후리스", "롱코트", "패딩"].includes(item.name)) score -= 30;
      if (weather.feelsLike <= 10 && ["반팔", "크롭탑"].includes(item.name)) score -= 30;
      if (weather.rainProbability > 50 && item.name === "미니스커트") score -= 40;
      if (weather.rainProbability > 50 && item.name === "바람막이") score += 25;
      return { item, reason: itemFlavorReason[item.name] ?? "오늘 코디와 잘 어울려요", score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ item, reason }) => ({ item, reason }));

  return ranked;
};

const getReason = (item: OutfitItem, weather: Weather, style: StyleType): string => {
  const flavor = itemFlavorReason[item.name] ?? "오늘 무드에 잘 맞는 선택이에요";

  if (weather.rainProbability > 50 && item.name === "미니스커트") {
    return "비 예보가 있어 우선순위는 낮지만, 실내 일정이면 가능해요";
  }

  if (item.name === "바람막이" && (weather.rainProbability > 50 || isWindHigh(weather))) {
    return "비/바람 예보가 있어 실용성이 특히 좋아요";
  }

  if (styleBoostMap[style]?.includes(item.name)) {
    return `${style} 무드와 잘 맞아요 · ${flavor}`;
  }

  if (item.category === "아우터") {
    const outerNeed = getOuterwearNeed(weather);
    if (outerNeed === "padding" && item.name === "패딩") return "체감이 매우 낮아 패딩이 가장 안전해요";
    if (outerNeed === "coat" && item.name.includes("코트")) return "코트급 보온이 필요한 날씨예요";
  }

  return flavor;
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

  const scoredPool = outfitItems.filter((item) => item.category === targetCategory).map((item) => {
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

    return { item, reason: getReason(item, weather, style), score };
  });

  return scoredPool.sort((a, b) => b.score - a.score).slice(0, 3);
};
