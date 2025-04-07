import createAtTimeCalc from "@/utils/createAtTimeCalc";
import { Content } from "@/utils/dataPaser";
import Image from "next/image";
import Link from "next/link";

export default function NextContentCard({content}: {content:Content}) {
  return (
    <Link className="w-full sm:flex-col flex items-center justify-center" href={`/posted/${content?.id}`}>
      <div className="flex items-center justify-center w-2/5 sm:w-full relative border-2 border-gray-300 rounded-3xl overflow-hidden">
        <Image
          className="sm:h-50 h-20 object-scale-down"
          alt="bg-img"
          src={`${content?.thombnail || "/jealth_logo_v3.png"}`}
          width={400}
          height={300}
        />
        <p className="text-(length:--text-xss) font-bold text-gray-300 absolute bottom-0 sm:bottom-3 left-4">
          조회수 {content?.views || 0}회
        </p>
      </div>
      <div className="w-full flex flex-col items-start sm:px-0 pl-5">
        <p className="my-1 font-blod text-gray-700 md:text-md text-sm ">{content?.title}</p>
        <p className="text-gray-600 md:text-md text-sm mt-1 w-full flex justify-right ">
          {content?.subtitle}
        </p>
        <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">
          {createAtTimeCalc(content?.createdAt)}
        </p>
      </div>
    </Link>
  );
}
