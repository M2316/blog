import Link from "next/link";

export default function SideNav(){
    return (
        <div className="flex items-center justify-center fixed top-1/2 transform -translate-y-1/2 right-32 w-32 text-white p-5 border-y-4 border-gray-300 hover:border-black 3xl:right-110">
          <ul className="w-full">
            <li className="flex flex-col justify-center  items-around gap-4">
              <Link href="/category/nextjs" className="text-gray-400 hover:text-black font-bold hover:border-b-2 w-full">
                Next.js
              </Link>
              <Link href="/category/nextjs" className="text-gray-400 hover:text-black font-bold hover:border-b-2  w-full">
                Next.js
              </Link>
              <Link href="/category/nextjs" className="text-gray-400 hover:text-black font-bold hover:border-b-2  w-full">
                Next.js
              </Link>
              <Link href="/category/nextjs" className="text-gray-400 hover:text-black font-bold hover:border-b-2  w-full">
                Next.js
              </Link>
            </li>
          </ul>
        </div>
    )
}