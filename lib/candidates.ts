export const KAKAO_CHAT_URL = "https://open.kakao.com/o/placeholder";

export type ConnectionDegree = "1촌" | "2촌" | "3촌";
export type CandidateGender = "여성" | "남성";

export type Candidate = {
  id: string;
  birthYear: number;
  ageRange: "20대 후반" | "30대 초반" | "30대 중반";
  gender: CandidateGender;
  height: string;
  region: string;
  jobCategory: string;
  personalityKeywords: string[];
  hobbies: string[];
  datingStyle: string;
  preferredPartner: string;
  mbti: string;
  intro: string;
  connectionDegree: ConnectionDegree;
  connectionDescription: string;
};

export const candidates: Candidate[] = [
  {
    id: "A-01",
    birthYear: 1994,
    ageRange: "30대 초반",
    gender: "여성",
    height: "164cm",
    region: "서울 동부권",
    jobCategory: "전문직",
    personalityKeywords: ["차분함", "배려", "자기관리"],
    hobbies: ["러닝", "전시", "맛집"],
    datingStyle: "안정적이고 진중한 관계 선호",
    preferredPartner: "대화 잘 통하고 생활 리듬이 건강한 사람",
    mbti: "ENFJ",
    intro: "편안하게 오래 만날 수 있는 관계를 선호하는 타입",
    connectionDegree: "1촌",
    connectionDescription: "에나 직접 지인",
  },
  {
    id: "A-02",
    birthYear: 1997,
    ageRange: "20대 후반",
    gender: "남성",
    height: "178cm",
    region: "경기 남부",
    jobCategory: "IT/개발",
    personalityKeywords: ["다정함", "성실함", "유머감각"],
    hobbies: ["클라이밍", "보드게임", "드립커피"],
    datingStyle: "친구처럼 편하게 시작해 꾸준히 챙기는 스타일",
    preferredPartner: "서로의 일을 응원하고 약속을 소중히 여기는 사람",
    mbti: "INTP",
    intro: "조용한 듯하지만 친해지면 장난기가 많은 개발자",
    connectionDegree: "2촌",
    connectionDescription: "에나 친구의 친구",
  },
  {
    id: "A-03",
    birthYear: 1991,
    ageRange: "30대 중반",
    gender: "여성",
    height: "162cm",
    region: "인천",
    jobCategory: "의료/보건",
    personalityKeywords: ["따뜻함", "책임감", "현실적"],
    hobbies: ["필라테스", "책방 투어", "집밥"],
    datingStyle: "서로의 속도를 존중하며 신뢰를 쌓는 관계",
    preferredPartner: "감정 표현이 솔직하고 예의가 몸에 밴 사람",
    mbti: "ISFJ",
    intro: "바쁜 일상 속에서도 마음을 잘 챙기는 안정형",
    connectionDegree: "3촌",
    connectionDescription: "지인 경로 확인 완료",
  },
  {
    id: "A-04",
    birthYear: 1993,
    ageRange: "30대 초반",
    gender: "남성",
    height: "181cm",
    region: "서울 서북권",
    jobCategory: "교육",
    personalityKeywords: ["긍정적", "섬세함", "대화형"],
    hobbies: ["자전거", "영화", "동네 산책"],
    datingStyle: "자주 웃고 편하게 이야기하는 관계를 좋아함",
    preferredPartner: "작은 배려를 알아보고 함께 성장하려는 사람",
    mbti: "ENFP",
    intro: "말이 잘 통하는 사람과 일상을 나누고 싶은 선생님 타입",
    connectionDegree: "1촌",
    connectionDescription: "에나 직접 지인",
  },
  {
    id: "A-05",
    birthYear: 1996,
    ageRange: "20대 후반",
    gender: "여성",
    height: "168cm",
    region: "경기 북부",
    jobCategory: "디자인/마케팅 프리랜서",
    personalityKeywords: ["솔직함", "감각적", "독립적"],
    hobbies: ["사진", "재즈바", "주말 여행"],
    datingStyle: "각자의 시간을 존중하면서도 표현은 아끼지 않는 편",
    preferredPartner: "취향을 나누고 새로운 경험을 함께 즐기는 사람",
    mbti: "ISTP",
    intro: "담백하고 센스 있게 가까워지는 걸 좋아하는 크리에이터",
    connectionDegree: "2촌",
    connectionDescription: "에나 친구의 친구",
  },
];
