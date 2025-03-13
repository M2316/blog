import Image from "next/image";
import Link from "next/link";

export default function CategoryItemCard({postedId}:{postedId: string}) {
    return (
        <Link href={`/posted/${postedId}`} className="flex flex-col justify-center items-center w-full">
            <div className="relative">
                <Image className="rounded-3xl h-40" alt="bg-img" src="/back-ground-5.jpg" width={400} height={300}/>
                <p className="text-(length:--text-xss) font-bold text-gray-300 absolute bottom-3 left-4">조회수 2,231</p>
            </div>
            <div className="w-full flex flex-col items-start">
                <h3 className="my-(--header-margin-3)">Title Container~!</h3>
                <p className="text-gray-600 text-x font-bold mt-1 w-full flex justify-right">Sub Title Container~! content discription~~</p>
                <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">2025. 02. 14</p>
            </div>
        </Link>
    )
}