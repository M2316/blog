'use client'
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
    thombnail
}:Content) {
    return(
        <Link href={`posted/${id}`} className="w-62 flex flex-col items-center rounded-3xl p-4 bg-[var(--color-card-background)] shadow-md">
            <div className="w-full relative">
                <Image 
                    className="rounded-3xl h-40 object-cover" 
                    alt="Thumbnail image" 
                    src={thombnail || "/jealth_logo_v3.png"} 
                    width={280} 
                    height={170} 
                    priority 
                />
                <p className="absolute bottom-2 left-3 text-xs text-gray-100 bg-black bg-opacity-50 px-2 py-1 rounded">
                    조회수 {views ?? "--"}
                </p>
            </div>
            <div className="w-full">
                <h4 className="my-(--header-margin-4) text-line-clamp" title={title}>{title}</h4>
                <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">
                    {
                        createAtTimeCalc(createdAt as string)
                    }
                </p>
                <h5 className="text-gray-600 text-line-clamp" title={subtitle}>{subtitle}</h5>
                
            </div>
        </Link>
    );

}