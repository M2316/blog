import Image from "next/image";
import Link from "next/link";

export default function NextContentCard() {
  return (
    <Link className="w-full" href="/posted/pleaseInputPostedID~!">
      <div className="relative shadow-xl rounded-3xl overflow-hidden">
        <Image
          className="h-40"
          alt="bg-img"
          src="/back-ground-5.jpg"
          width={400}
          height={300}
        />
        <p className="text-(length:--text-xss) font-bold text-gray-300 absolute bottom-3 left-4">
          조회수 2,231
        </p>
      </div>
      <div className="w-full flex flex-col items-start">
        <h3 className="my-1">Title Container~!</h3>
        <p className="text-gray-600 text-x mt-1 w-full flex justify-right">
          Sub Title Container~! content discription~~
        </p>
        <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">
          2025. 02. 14
        </p>
      </div>
    </Link>
  );
}
