export type LocaleMap = {
    [key: string]: string;
  };

export const localeMap: LocaleMap = {
    Gangnam: "강남구",
    Gangdong: "강동구",
    Gangbuk: "강북구",
    Gangseo: "강서구",
    Gwanak: "관악구",
    Gwangjin: "광진구",
    Guro: "구로구",
    Geumcheon: "금천구",
    Nowon: "노원구",
    Dobong: "도봉구",
    Dongdaemun: "동대문구",
    Dongjak: "동작구",
    Mapo: "마포구",
    Seodaemun: "서대문구",
    Seocho: "서초구",
    Seongdong: "성동구",
    Seongbuk: "성북구",
    Songpa: "송파구",
    Yangcheon: "양천구",
    Yeongdeungpo: "영등포구",
    Yongsan: "용산구",
    Eunpyeong: "은평구",
    Jongno: "종로구",
    Jung: "중구",
    Jungnang: "중랑구",
};
  
export const pokemonByLocale: { [key: string]: number[] } = {
  Gangnam: [52, 113, 133, 125, 129, 132],
  Gangdong: [60, 126, 114, 147, 118, 27],
  Gangbuk: [27, 50, 74, 46, 69, 29],
  Gangseo: [88, 100, 54, 129, 120, 90],
  Gwanak: [41, 32, 29, 69, 56, 66],
  Gwangjin: [84, 142, 77, 23, 63, 118],
  Guro: [107, 106, 66, 56, 109, 74],
  Geumcheon: [104, 107, 48, 95, 21, 111],
  Nowon: [84, 21, 83, 123, 41, 98],
  Dobong: [104, 46, 29, 32, 27, 50],
  Dongdaemun: [132, 102, 96, 69, 100, 81],
  Dongjak: [54, 60, 72, 79, 129, 86],
  Mapo: [98, 86, 120, 124, 125, 58],
  Seodaemun: [13, 123, 48, 74, 69, 114],
  Seocho: [125, 122, 52, 109, 113, 133],
  Seongdong: [90, 120, 116, 140, 63, 100],
  Seongbuk: [96, 102, 92, 48, 46, 66],
  Songpa: [77, 54, 81, 125, 133, 126],
  Yangcheon: [128, 84, 123, 52, 83, 95],
  Yeongdeungpo: [120, 79, 86, 132, 109, 72],
  Yongsan: [92, 63, 140, 138, 124, 147],
  Eunpyeong: [114, 69, 13, 50, 29, 107],
  Jongno: [122, 102, 52, 113, 124, 95],
  Jung: [133, 132, 52, 83, 113, 127],
  Jungnang: [21, 123, 84, 19, 27, 48],
};

export interface PokemonName {
  language: { name: string };
  name: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string };
}

export interface PokemonSpecies {
  names: PokemonName[];
  capture_rate: number;
  flavor_text_entries: FlavorTextEntry[];
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
}

export interface MoveDetail {
  names: PokemonName[];
}


export const typeMap: { [key: string]: string } = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
};

export const typeColorMap: { [key: string]: string } = {
  grass: "#A8E6A3",      
  bug: "#A8E6A3",
  poison: "#A8E6A3",
  fire: "#FF7262",       
  water: "#76C7F2",      
  ice: "#76C7F2",
  electric: "#FFF176",  
  fighting: "#F4A460",   
  ground: "#F4A460",
  rock: "#F4A460",
  psychic: "#CBA4E8",    
  ghost: "#CBA4E8",
  normal: "#E0E0E0",     
  flying: "#E0E0E0",
  dark: "#2F2F2F",      
  steel: "#B0BEC5",      
  fairy: "#F8BBD0",     
  dragon: "#FFA726",    
};


export type TabType = "소개" | "능력치" | "기술";

export interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}

export interface PokemonTabsProps {
  koreanDescription: string;
  stats: PokemonStat[];
  koreanSkill: string[];
}
