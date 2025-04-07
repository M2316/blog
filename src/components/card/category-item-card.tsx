import colorParser from "@/utils/colorParser";
import createAtTimeCalc from "@/utils/createAtTimeCalc";
import { Content } from "@/utils/dataPaser";
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
      className="flex flex-row sm:flex-col justify-start items-center w-full shadow-md rounded-3xl p-3 sm:p-4 bg-[var(--color-card-background)] hover:shadow-lg transition-shadow duration-300 h-full"
    >
      <div className="relative w-1/3 sm:w-full">
        <Image
          className="rounded-2xl sm:rounded-3xl h-24 w-full sm:h-40 object-cover"
          alt="bg-img"
          src={`${content.thombnail || "/jealth_logo_v3.png"}`}
          width={400}
          height={300}
        />
        <p className="absolute bottom-2 left-2 sm:left-3 text-xs text-gray-100 bg-black bg-opacity-50 px-2 py-1 rounded">
          조회수 {content.views}
        </p>
      </div>
      <div className="w-2/3 sm:w-full flex flex-col items-start px-3 sm:px-0 sm:mt-3 h-full">
        <div className="flex-grow">
          <p className="flex flex-wrap gap-1.5 py-1 item-center mt-1">
            {content.tags &&
              content.tags.map((tag, idx) => (
                <span
                  key={`tag-${idx}`}
                  className={`px-1.5 py-0.5 text-[10px] sm:text-[11px] rounded font-bold text-white`}
                  style={{
                    backgroundColor: colorParser(tag.color || "default"),
                    color: "#000000",
                  }}
                >
                  {tag.name}
                </span>
              ))}
          </p>
          <p className="text-sm sm:text-base font-semibold line-clamp-2" title={content.title}>{content.title}</p>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1 w-full" title={content.subtitle}>
            {content.subtitle}
          </p>
        </div>
        <p className="text-gray-400 text-[10px] sm:text-xs mt-auto w-full text-right">
          {createAtTimeCalc(content.createdAt as string)}
        </p>
      </div>
    </Link>
  );
}
