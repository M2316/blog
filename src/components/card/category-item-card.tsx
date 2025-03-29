import { Content } from "@/actions/content.action";
import colorParser from "@/utils/colorParser";
import createAtTimeCalc from "@/utils/createAtTimeCalc";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function CategoryItemCard({
  postedId,
  content,
}: {
  postedId: string;
  content: Content;
}) {
  return (
    <Link
      href={`/posted/${postedId}`}
      className="flex flex-col justify-center items-center w-full shadow-md rounded-3xl p-4 bg-[var(--color-card-background)]"
    >
      <div className="relative">
        <Image
          className="rounded-3xl h-40"
          alt="bg-img"
          src={`${content.thombnail || "/jealth_logo_v3.png"}`}
          width={400}
          height={300}
        />
        <p className="absolute bottom-2 left-3 text-xs text-gray-100 bg-black bg-opacity-50 px-2 py-1 rounded">
          조회수 {content.views}
        </p>
      </div>
      <div className="w-full flex flex-col items-start">
        <p className="flex gap-2 py-1 item-center mt-1">
          {content.tags &&
            content.tags.map((tag, idx) => (
              <span
                key={`tag-${idx}`}
                className={`px-1.5 py-0.5 text-[11px] rounded font-bold`}
                style={{
                  backgroundColor: colorParser(tag.color || "default"),
                  color: "#000000",
                }}
              >
                {tag.name}
              </span>
            ))}
        </p>
        <h4 className="text-line-clamp" title={content.title}>{content.title}</h4>
        <p className="text-line-clamp text-gray-600 text-x font-bold mt-1 w-full flex justify-right" title={content.subtitle}>
          {content.subtitle}
        </p>
        <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">
          {createAtTimeCalc(content.createdAt as string)}
        </p>
      </div>
    </Link>
  );
}
