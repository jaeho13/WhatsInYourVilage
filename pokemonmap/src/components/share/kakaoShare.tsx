// hooks/useKakaoShare.ts
"use client";

import { localeMap } from "@/types";

export interface KakaoShareOptions {
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
}

function isKakaoSDKReady(): boolean {
  const kakao = (window as any).Kakao;
  return !!(kakao && kakao.isInitialized());
}

async function getCurrentPageInfo() {
  const currentUrl = window.location.href;
  const title = document.title || "우리 동네 포켓몬 찾기";

  const pathParts = currentUrl.split("/");

  // 포켓몬 상세 페이지인지 확인 (/info/123 형태)
  if (
    pathParts.includes("info") &&
    pathParts[pathParts.length - 1].match(/^\d+$/)
  ) {
    const pokemonId = pathParts[pathParts.length - 1];

    try {
      // 포켓몬 정보 가져오기
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemon = await res.json();

      // 포켓몬 종 정보 가져오기
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      const species = await speciesRes.json();

      // 한국어 이름 찾기
      const koreanName =
        species.names.find((name: any) => name.language.name === "ko")?.name ||
        pokemon.name;

      // 조사 처리 함수
      function getKoreanParticle(name: string, type: "가" | "이"): string {
        if (!name) return type === "가" ? "가" : "이";

        const lastChar = name[name.length - 1];
        const lastCharCode = lastChar.charCodeAt(0);

        if (lastCharCode >= 0xac00 && lastCharCode <= 0xd7a3) {
          const hasJongseong = (lastCharCode - 0xac00) % 28 !== 0;

          if (type === "가") {
            return hasJongseong ? "이" : "가";
          } else {
            return hasJongseong ? "이" : "가";
          }
        }

        return type === "가" ? "가" : "이";
      }

      const subjectParticle = getKoreanParticle(koreanName, "가");
      const possessiveParticle = getKoreanParticle(koreanName, "이");

      return {
        url: currentUrl,
        title: `${koreanName}${subjectParticle} 어디에 살까??`,
        description: `${koreanName}${possessiveParticle} 사는 동네 확인하기`,
        imageUrl: pokemon.sprites.front_default,
        isPokemonDetail: true,
        pokemonName: koreanName,
      };
    } catch (error) {
      console.error("포켓몬 정보를 가져오는데 실패했습니다:", error);
      return {
        url: currentUrl,
        title: "포켓몬 정보",
        description: "포켓몬의 서식지 정보를 확인해보세요",
        imageUrl: `${window.location.origin}/thumbnail.png`,
        isPokemonDetail: true,
      };
    }
  }

  // 지역 페이지인지 확인
  const districtKey = pathParts[pathParts.length - 1];
  const districtName = localeMap[districtKey] || "우리 동네";

  return {
    url: currentUrl,
    title,
    districtKey,
    districtName,
    isPokemonDetail: false,
  };
}

export async function shareCurrentPage(options: KakaoShareOptions = {}) {
  if (!isKakaoSDKReady()) {
    alert("카카오 SDK가 로드되지 않았습니다.");
    return;
  }

  const kakao = (window as any).Kakao;
  const pageInfo = await getCurrentPageInfo();

  let defaultTitle: string;
  let defaultDescription: string;
  let defaultImageUrl: string;
  let defaultButtonText: string;

  if ((pageInfo as any).isPokemonDetail) {
    // 포켓몬 상세 페이지
    defaultTitle = (pageInfo as any).title || "포켓몬 정보";
    defaultDescription =
      (pageInfo as any).description || "포켓몬의 서식지 정보를 확인해보세요";
    defaultImageUrl =
      (pageInfo as any).imageUrl || `${window.location.origin}/thumbnail.png`;
    defaultButtonText = "포켓몬 정보 보기";
  } else {
    // 지역 페이지
    const districtName = (pageInfo as any).districtName;
    defaultTitle =
      districtName === "우리 동네"
        ? "우리 동네 포켓몬 찾기"
        : `${districtName}에 어떤 포켓몬이 살까`;
    defaultDescription =
      districtName === "우리 동네"
        ? "동네별 포켓몬을 찾아보세요! 🎮"
        : `${districtName}에 사는 포켓몬 보러 가기`;
    defaultImageUrl = `${window.location.origin}/thumbnail.png`;
    defaultButtonText = "포켓몬 보러가기";
  }

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: options.title || defaultTitle,
      description: options.description || defaultDescription,
      imageUrl: options.imageUrl || defaultImageUrl,
      link: {
        mobileWebUrl: pageInfo.url,
        webUrl: pageInfo.url,
      },
    },
    buttons: [
      {
        title: options.buttonText || defaultButtonText,
        link: {
          mobileWebUrl: pageInfo.url,
          webUrl: pageInfo.url,
        },
      },
    ],
  });
}

export function shareCustom(
  url: string,
  title: string,
  description: string,
  imageUrl?: string,
  buttonText?: string
) {
  if (!isKakaoSDKReady()) {
    alert("카카오 SDK가 로드되지 않았습니다.");
    return;
  }

  const kakao = (window as any).Kakao;

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl: imageUrl || `${window.location.origin}/logo.png`,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: buttonText || "바로가기",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
}
