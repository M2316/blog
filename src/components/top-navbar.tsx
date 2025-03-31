"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { useDebouncedFetch } from "@/app/hooks/useDebounce";
import { titleSearchFetch } from "@/actions/notion";
import { Content } from "@/utils/dataPaser";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/app/store/useGlobalStore";
import { FaEye } from "react-icons/fa6";

export default function TopNavbar() {
  const { searchBarIsOpen, setSearchBarIsOpen } = useGlobalStore();

  const searchBarRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Content[]>([]);

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!searchBarIsOpen) {
      setSearchResults([]);
    }
    if (searchBarIsOpen && searchBarRef.current !== null) {
      searchBarRef.current.focus();
      searchBarRef.current.value = searchQuery;
    }
    document.getElementById("globalLayout")?.addEventListener("click", (e) => {
      setSearchBarIsOpen(false);
    });
  }, [searchBarIsOpen]);

  useEffect(() => {
    try {
      const searchFetch = async () => {
        if (searchQuery === "") {
          setSearchResults([]);
          setSearchNotFound(false);
          return;
        };
        if (!searchBarIsOpen) return;
        const response = await titleSearchFetch<Content[]>(searchQuery);
        setSearchResults(response);
        setSearchNotFound(response.length === 0);
      };
      searchFetch();
    } catch (e) {
      console.error("Error fetching search results:", e);
    } finally {
      setTimeout(() => {
        setIsSearchLoading(false);
      }, 500);
    }

    if (searchBarRef.current !== null) {
      searchBarRef.current.focus();
      searchBarRef.current.value = searchQuery;
    }
  }, [searchQuery, searchBarIsOpen]);

  const fetchSearchResults = (query: string) => {
    setSearchQuery(query);
  };

  const debouncedFetchHandler = useDebouncedFetch(() => {
    fetchSearchResults(searchBarRef.current?.value || ""); // Replace "search query" with actual input value
    setIsSearchLoading(true);
    setSearchNotFound(false);
  }, 300);

  const searchListClickHandler = (postedId: string) => {
    setSearchBarIsOpen(false);
    router.push(`/posted/${postedId}`);
  };
  return (
    <nav className="py-4 px-20 bg-white shadow-md fixed top-0 w-full z-10">
      <ul className="max-w-6xl flex justify-between mx-auto">
        <li className="text-black flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <p className="ml-3 font-bold text-2xl">JEALTH BLOG</p>
          </Link>
        </li>
        <li className="flex items-center justify-center relative">
          {searchBarIsOpen && (
            <>
              <input
                ref={searchBarRef}
                type="text"
                placeholder="Search..."
                className="bg-white w-150 p-3 px-10 border border-gray-300 rounded shadow-md -right-3 absolute z-20 outline-none focus:border-gray-400 focus:ring-gray-400 z-10"
                onChange={debouncedFetchHandler}
              />
              <ul className="bg-white w-150 p-3 px-7 border border-gray-300 rounded shadow-md -right-3 top-10 absolute z-20 outline-none focus:border-gray-400 focus:ring-gray-400 z-10 max-h-[300px] overflow-y-auto">
                {isSearchLoading && (
                  <div className="flex items-center justify-start w-full h-full">
                    <p className="text-gray-400">Loading...</p>
                  </div>
                )}
                {!isSearchLoading &&
                  searchResults.length > 0 &&
                  searchResults.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 w-full h-full z-20 hover:bg-gray-200 cursor-pointer rounded-md"
                    >
                      <button
                        onClick={() => searchListClickHandler(item.id)}
                        className="w-full h-full z-20 hover:bg-gray-200 cursor-pointer px-3 p-1 rounded-md flex items-center justify-start"
                      >
                        {item.title}
                      </button>
                      <span className="text-gray-400 text-sm mr-2 flex items-center justify-end gap-2">
                        {item.views > 0 ? (
                          <>{item.views}<FaEye/></>
                        ):(
                          <>0<FaEye/></>
                        ) }
                      </span>
                    </li>
                  ))}
                  {
                    searchNotFound && (
                      <li className="w-full h-full z-20">
                        <button className="w-full h-full z-20 px-3 p-1 flex items-center justify-start text-gray-400">
                          검색 결과가 없습니다.
                        </button>
                      </li>
                    )
                  }
              </ul>
            </>
          )}
          <button
            onClick={() => setSearchBarIsOpen(!searchBarIsOpen)}
            className="flex items-center z-20 cursor-pointer"
          >
            <BiSearch size={30} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
