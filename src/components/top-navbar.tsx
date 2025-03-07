import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function TopNavbar() {
  return (
    <nav className="py-4 px-20 bg-white shadow-md fixed top-0 w-full z-10">
      <ul className="flex justify-between mx-auto">
        <li className="text-black flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <p className="ml-3 font-bold text-2xl">JEALTH BLOG</p>
          </Link>
        </li>
        <li className="flex items-center justify-center cursor-pointer">
          <BiSearch size={30} />
        </li>
      </ul>
    </nav>
  );
}
