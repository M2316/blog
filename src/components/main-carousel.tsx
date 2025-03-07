import Image from "next/image";
import Link from "next/link";

export default function MainCarousel() {
  return (
    <div className="flex justify-center items-center h-100 w-full my-10">
      <Link href={"/"} className="w-full h-full relative">
        <Image
          className="rounded-3xl object-cover w-full h-full"
          src="/back-ground-4.jpg"
          alt="main-carousel"
          width={1200}
          height={1200}
        />
        <h2 className="text-right w-200 absolute bottom-10 right-10 transform text-white text-4xl font-bold">
          JEALTH SERVICE INFORMATION.
          <br />
          EVERYDAY WORKOUT.
        </h2>
      </Link>
    </div>
  );
}
