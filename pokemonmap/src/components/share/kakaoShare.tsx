import { localeMap } from "@/types";

interface KakaoShareOptions {
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
}

export class KakaoShare {
  private static checkKakaoSDK(): boolean {
    const kakao = (window as any).Kakao;
    return !!(kakao && kakao.isInitialized());
  }

  private static getCurrentPageInfo() {
    const currentUrl = window.location.href;
    const title = document.title || "우리 동네 포켓몬 찾기";

    const pathParts = currentUrl.split("/");
    const districtKey = pathParts[pathParts.length - 1];
    const districtName = localeMap[districtKey] || "우리 동네";

    return {
      url: currentUrl,
      title,
      districtKey,
      districtName,
    };
  }

  public static shareCurrentPage(options: KakaoShareOptions = {}) {
    if (!this.checkKakaoSDK()) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    const pageInfo = this.getCurrentPageInfo();
    const kakao = (window as any).Kakao;

    const defaultTitle =
      pageInfo.districtName === "우리 동네"
        ? "우리 동네 포켓몬 찾기"
        : `${pageInfo.districtName}에 어떤 포켓몬이 살까`;

    const defaultDescription =
      pageInfo.districtName === "우리 동네"
        ? "동네별 포켓몬을 찾아보세요! 🎮"
        : `${pageInfo.districtName}에 사는 포켓몬 보러 가기`;

    const shareData = {
      objectType: "feed",
      content: {
        title: options.title || defaultTitle,
        description: options.description || defaultDescription,
        imageUrl: options.imageUrl || `${window.location.origin}/thumbnail.png`,
        link: {
          mobileWebUrl: pageInfo.url,
          webUrl: pageInfo.url,
        },
      },
      buttons: [
        {
          title: options.buttonText || "포켓몬 보러가기",
          link: {
            mobileWebUrl: pageInfo.url,
            webUrl: pageInfo.url,
          },
        },
      ],
    };

    kakao.Share.sendDefault(shareData);
  }

  public static shareCustom(
    url: string,
    title: string,
    description: string,
    imageUrl?: string,
    buttonText?: string
  ) {
    if (!this.checkKakaoSDK()) {
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
}

// 더 간단하게 사용할 수 있는 함수들도 export
export const shareCurrentPage = (options?: KakaoShareOptions) => {
  KakaoShare.shareCurrentPage(options);
};

export const shareCustom = (
  url: string,
  title: string,
  description: string,
  imageUrl?: string,
  buttonText?: string
) => {
  KakaoShare.shareCustom(url, title, description, imageUrl, buttonText);
};
