import Image from "next/image";
import Link from "next/link";

export default function MainCarousel() {
  return (
    <div className="flex justify-center items-center sm:h-100 w-full sm:my-10 my-4">
      <Link href={"/"} className="sm:px-0 sm:h-full px-5 h-80 relative w-full">
        <Image
          className="rounded-3xl object-cover w-full h-full"
          src="/back-ground-4.jpg"
          alt="main-carousel"
          width={1200}
          height={1200}
        />
        <p className="text-right w-200 absolute bottom-10 right-10 transform text-white text-xl sm:text-4xl font-bold">
          JEALTH SERVICE INFORMATION.
          <br />
          EVERYDAY WORKOUT.
        </p>
      </Link>
    </div>
  );
}
