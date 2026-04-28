import { OutfitItem } from "@/lib/types";

export const outfitItems: OutfitItem[] = [
  { id: "top-short", name: "반팔", category: "상의", tags: ["캐주얼", "가벼움"] },
  { id: "top-long", name: "긴팔티", category: "상의", tags: ["데일리"] },
  { id: "top-shirt", name: "셔츠", category: "상의", tags: ["출근", "깔끔"] },
  { id: "top-knit", name: "니트", category: "상의", tags: ["포근함"] },
  { id: "top-mtm", name: "맨투맨", category: "상의", tags: ["꾸안꾸", "데일리"] },
  { id: "top-hood", name: "후드", category: "상의", tags: ["캐주얼"] },
  { id: "top-blouse", name: "블라우스", category: "상의", gender: "여성", tags: ["데이트", "출근"] },
  { id: "top-crop", name: "크롭탑", category: "상의", gender: "여성", tags: ["데이트", "트렌디"] },
  { id: "top-polo", name: "카라티", category: "상의", gender: "남성", tags: ["출근", "단정"] },

  { id: "bot-denim", name: "데님", category: "하의", tags: ["데일리", "캐주얼"] },
  { id: "bot-slacks", name: "슬랙스", category: "하의", tags: ["출근", "깔끔"] },
  { id: "bot-wide", name: "와이드팬츠", category: "하의", tags: ["꾸안꾸"] },
  { id: "bot-jogger", name: "조거팬츠", category: "하의", tags: ["동네마실", "편함"] },
  { id: "bot-long-skirt", name: "롱스커트", category: "하의", tags: ["데이트"] },
  { id: "bot-mini-skirt", name: "미니스커트", category: "하의", tags: ["데이트"] },
  { id: "bot-leggings", name: "레깅스", category: "하의", tags: ["동네마실", "활동성"] },

  { id: "outer-cardigan", name: "가디건", category: "아우터", tags: ["가벼움"] },
  { id: "outer-jacket", name: "자켓", category: "아우터", tags: ["출근", "데이트"] },
  { id: "outer-blouson", name: "블루종", category: "아우터", tags: ["트렌디"] },
  { id: "outer-trench", name: "트렌치코트", category: "아우터", tags: ["출근", "데이트"] },
  { id: "outer-short-coat", name: "숏코트", category: "아우터", tags: ["포멀"] },
  { id: "outer-long-coat", name: "롱코트", category: "아우터", tags: ["포멀", "보온"] },
  { id: "outer-padding", name: "패딩", category: "아우터", tags: ["방한"] },
  { id: "outer-windbreaker", name: "바람막이", category: "아우터", tags: ["방수", "활동성"] },
  { id: "outer-fleece", name: "후리스", category: "아우터", tags: ["보온", "캐주얼"] },
];

export const styleBoostMap: Record<string, string[]> = {
  동네마실: ["조거팬츠", "레깅스", "맨투맨", "후드", "바람막이"],
  출근: ["셔츠", "슬랙스", "자켓", "트렌치코트", "카라티", "블라우스"],
  데이트: ["블라우스", "롱스커트", "미니스커트", "자켓", "트렌치코트", "크롭탑"],
  꾸안꾸: ["와이드팬츠", "맨투맨", "니트", "블루종", "데님"],
};
