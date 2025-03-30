import createAtTimeCalc from "@/utils/createAtTimeCalc";
import { Content } from "@/utils/dataPaser";
import Image from "next/image";
import Link from "next/link";

export default function NextContentCard({content}: {content:Content}) {
  console.log(content)
  return (
    <Link className="w-full" href={`/posted/${content?.id}`}>
      <div className="relative shadow-xl rounded-3xl overflow-hidden">
        
        <Image
          className="h-50"
          alt="bg-img"
          src={`${content?.thombnail || "/jealth_logo_v3.png"}`}
          width={400}
          height={300}
        />
        <p className="text-(length:--text-xss) font-bold text-gray-300 absolute bottom-3 left-4">
          조회수 {content?.views || 0}회
        </p>
      </div>
      <div className="w-full flex flex-col items-start">
        <h3 className="my-1">{content?.title}</h3>
        <p className="text-gray-600 text-x mt-1 w-full flex justify-right">
          {content?.subtitle}
        </p>
        <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">
          {createAtTimeCalc(content?.createdAt)}
        </p>
      </div>
    </Link>
  );
}
