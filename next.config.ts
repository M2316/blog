import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/v1/:path*",
  //       destination: "https://api.notion.com/v1/:path*",
  //     },
  //   ];
  // },
  async headers() {
    return [
      {
        source: "/api.notion.com/:path*", // `/api` 경로에 대해 헤더 추가
        headers: [
          {
            key: "Notion-Version",
            value: "2022-06-28", // 기본값 추가
          },
          {
            key: "Content-Type",
            value: "application/json",
          },
          {
            key: "Authorization",
            value: `Bearer ntn_w84492364878RP8mihQCFIhrkLKthysvQQZahlJic0I01X`, // 기본값 추가
          },
        ],
      }
    ];
  },
  env: {
    NEXT_PUBLIC_API_NOTION_TOKEN: process.env.NEXT_PUBLIC_API_NOTION_TOKEN,
    NEXT_PUBLIC_API_NOTION_DATABASE_ID: process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID,
    NEXT_PUBLIC_API_NOTION_URL: process.env.NEXT_PUBLIC_API_NOTION_URL,
    NEXT_PUBLIC_API_NOTION_VERSION: process.env.NEXT_PUBLIC_API_NOTION_VERSION,
  },
};

export default nextConfig;