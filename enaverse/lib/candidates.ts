export const KAKAO_CHAT_URL = "https://open.kakao.com/o/szV01Tui";

export type ConnectionDegree = "1촌" | "2촌" | "3촌";
export type CandidateGender = "여성" | "남성";

export type Candidate = {
  id: string;
  birthYear: number;
  gender: CandidateGender;
  height: string;
  region: string;
  jobCategory: string;
  personality: string;
  hobbies: string;
  datingStyle: string;
  preferredPartner: string;
  mbti: string;
  intro: string;
  connectionDegree: ConnectionDegree;
  connectionLabel: string;
};

export const candidates: Candidate[] = [
  {
    id: "A-01",
    birthYear: 1997,
    gender: "여성",
    height: "168cm",
    region: "서울",
    jobCategory: "배우",
    mbti: "ENFP",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "긍정적 / 공감능력이 좋음 / 리액션 담당",
    hobbies: "여행, 방탈출, 영화",
    datingStyle: "서로 의지하고 존중하면서 만나는 관계가 좋습니다!",
    preferredPartner: "티키타카 잘 되는 사람이 좋아요! 돌아다니는 걸 좋아해서 같이 다닐 수 있는 분이면 좋을 것 같아요!",
    intro: "같이 재밌는 시간 보내요!!",
  },
  {
    id: "A-02",
    birthYear: 1991,
    gender: "남성",
    height: "180cm",
    region: "서울",
    jobCategory: "공공기관",
    mbti: "ISTJ",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "추가 확인 필요",
    hobbies: "추가 확인 필요",
    datingStyle: "추가 확인 필요",
    preferredPartner: "추가 확인 필요",
    intro: "추가 확인 필요",
  },
  {
    id: "A-03",
    birthYear: 1997,
    gender: "여성",
    height: "160cm",
    region: "서울",
    jobCategory: "서비스직(귀금속)",
    mbti: "ENFJ",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "발랄함 / 유쾌함 / 털털함",
    hobbies: "게임, 야구관람",
    datingStyle: "편안한 관계, 친구처럼 티카타카 잘되는 스타일",
    preferredPartner: "대화 잘 통하는 사람, 잘나도 잘난척 하지 않는 사람",
    intro:
      "어른들한테는 귄있다(전라도 사투리), 친구들한테는 볼매다 라는 말을 많이 듣는편입니다. 밝고 잘 웃는 편이라 상대방이 조용하고 차분하거나 혹은 저랑 에너지가 비슷해도 다 잘 맞는편이에요😄",
  },
  {
    id: "A-04",
    birthYear: 1991,
    gender: "남성",
    height: "170cm",
    region: "서울",
    jobCategory: "공인중개사",
    mbti: "ENFP",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "경청 잘함 / 다정함 / 유쾌함",
    hobbies: "헬스, 카페, 여행",
    datingStyle: "편안하고 서로 배려하는 관계, 자연스럽게 챙겨주는 스타일",
    preferredPartner: "대화 잘 통하고 예의 있으며, 자기 일에 성실한 사람",
    intro: "사람 냄새 나게 살고 싶습니다",
  },
  {
    id: "A-05",
    birthYear: 1997,
    gender: "여성",
    height: "158cm",
    region: "서울",
    jobCategory: "화장품",
    mbti: "ESTP",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "유머 / 애교 / 뒤끝X",
    hobbies: "여행, 운동",
    datingStyle: "친구같은 스타일",
    preferredPartner: "재미있고 유머코드 잘 맞는 사람, 키 큰 사람, 감정 기복 적은 사람",
    intro: "애교 많고 귀엽다!ㅋㅋㅋ",
  },
  {
    id: "A-06",
    birthYear: 1994,
    gender: "여성",
    height: "160cm",
    region: "서울",
    jobCategory: "PD",
    mbti: "ESFJ",
    connectionDegree: "1촌",
    connectionLabel: "에나 직접 지인",
    personality: "다정한 / 발랄함 / 진중한",
    hobbies: "야구보기, 운동, 여행",
    datingStyle: "서로 배려하고 존중하는 연애, 불안감 없이 안정적으로 연애하길 바람, 신뢰있는 연애",
    preferredPartner: "대화 잘 잘 통하고 예의바르고 자기 일 열심히 하는 사람, 티키타카 잘 되는 사람, 체격 있는 사람 좋아함",
    intro: "티키타카 잘 되는 사람이면 나랑 노는 거 재밌을걸!",
  },
  {
    id: "A-07",
    birthYear: 1997,
    gender: "여성",
    height: "168cm",
    region: "서울",
    jobCategory: "사무직(비서)",
    mbti: "INFJ",
    connectionDegree: "1촌",
    connectionLabel: "에나 직접 지인",
    personality: "발랄한 / 세심함 / 배려심",
    hobbies: "영화보기, 여행, 클라이밍",
    datingStyle: "서로 챙겨주고 아껴줄 수 있는 알콩달콩 다정형^_^",
    preferredPartner: "센스좋고 선한(순딩한) 따수운 사람",
    intro: "에나의 SSS급 최강매물 많관부~",
  },
  {
    id: "A-08",
    birthYear: 1996,
    gender: "남성",
    height: "170cm 중반",
    region: "서울",
    jobCategory: "스타트업",
    mbti: "ENTP",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "재밌고 유쾌한 스타일 / 긍정적 / 추가 확인 필요",
    hobbies: "음악, 빠델",
    datingStyle: "추가 확인 필요",
    preferredPartner: "긍정적인 여자분",
    intro: "재밌고 유쾌한 스타일이고 아랍상임",
  },
  {
    id: "A-09",
    birthYear: 1995,
    gender: "여성",
    height: "170cm 초반",
    region: "서울",
    jobCategory: "제약회사",
    mbti: "INFJ",
    connectionDegree: "2촌",
    connectionLabel: "에나 친구의 친구",
    personality: "추가 확인 필요",
    hobbies: "책읽기, 오케스트라",
    datingStyle: "추가 확인 필요",
    preferredPartner: "모범생 스타일의 키큰남성",
    intro: "추가 확인 필요",
  },
];
