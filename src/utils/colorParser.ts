// export const TEXT_BOX_BACKGROUND_COLOR = {
export const BLOG_COLOR = {
    blue: "#A7C7E7", // 파스텔 블루
    green: "#B4E4C9", // 파스텔 그린
    purple: "#c68de0", // 파스텔 퍼플
    pink: "#f4c2f4", // 파스텔 핑크
    red: "#F4B5B5", // 파스텔 레드
    gray: "#bbbbbb", // 파스텔 그레이
    default: "#717171", // 파스텔 다크 그레이
    yellow: "#FFF1B6", // 파스텔 옐로우
    orange: "#FFD6A5", // 파스텔 오렌지
    brown: "#E9D6B3", // 파스텔 브라운
  };

export default function colorParser(color: string) {
    return BLOG_COLOR[color as keyof typeof BLOG_COLOR] || BLOG_COLOR.default;
};