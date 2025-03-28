import colorPaser, { BLOG_COLOR } from "@/utils/colorPaser";
import Image from "next/image";
import Link from "next/link";

interface PropsGroup {
  id?: string;
  name?: string;
  contentCount?: number;
  color?: keyof typeof  BLOG_COLOR; // 선택적 속성으로 변경
  views?: number;
  group?: string;
}

export default function MainGroupCard({ group, idx }: { group: PropsGroup; idx: number }) {
  const bgColor = colorPaser(group.color || "default");

  return (
    <Link
      className="w-full h-50 flex flex-col items-center relative rounded-3xl overflow-hidden"
      href={`/category?id=${group.id}&groupName=${group.name}`}
    >
      <Image
        className="object-cover h-full w-full"
        alt="bg-img"
        src={`/back-ground-${(idx + 1) % 6}.jpg`}
        width={400}
        height={600}
      />
      <div
        className="absolute bottom-0 w-full h-15"
        style={{ backgroundColor: bgColor, opacity: 0.7 }}
      >
        <div className="flex items-center px-5 h-full w-full">
          <h4 className="font-bold my-1">{group.name}</h4>
          <div className="ml-2 flex justify-center items-center bg-gray-600 rounded-full text-white text-xs min-w-6 h-6 px-2">
            <span className="w-full font-bold text-center">{group.contentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
