import Image from "next/image";
import Link from "next/link";

export default function MainGroupCard() {
  return (
    <Link
      className="w-full h-100 flex flex-col items-center relative"
      href="/group/1"
    >
      <Image
        className="rounded-3xl object-cover h-full w-full"
        alt="bg-img"
        src="/back-ground-1.jpg"
        width={400}
        height={600}
      />
      <div className="opacity-gb absolute bottom-0 w-full h-20 rounded-b-3xl">
        <div className="flex items-center px-5 h-full w-full">
          <h4 className="text-white font-bold">Front-End</h4>
          <div className="ml-2 flex justfiy-center items-center bg-gray-600 rounded-full text-white text-xs">
            <span className="w-full font-bold text-center p-1.5">23</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
