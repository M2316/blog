"use client";
import createAtTimeCalc from "@/utils/createAtTimeCalc";
import { Content } from "@/utils/dataPaser";
import Image from "next/image";
import Link from "next/link";

export default function MainItemCard({
  id,
  title,
  createdAt,
  subtitle,
  views,
  thombnail,
}: Content) {
  return (
    <div className="w-full p-3">
      <article className="group h-full bg-[var(--color-card-background)] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <Link href={`posted/${id}`} className="block h-full">
          {/* 이미지 섹션 */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              alt="Thumbnail image"
              src={thombnail || "/jealth_logo_v3.png"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-3 left-3 px-2 py-1 text-xs text-white bg-black/50 rounded backdrop-blur-sm">
              조회수 {views ?? "--"}
            </span>
          </div>

          {/* 컨텐츠 섹션 */}
          <div className="p-4">
            <p className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {subtitle}
            </p>
            <time className="block text-xs text-gray-400 text-right">
              {createAtTimeCalc(createdAt as string)}
            </time>
          </div>
        </Link>
      </article>
    </div>
  );
}