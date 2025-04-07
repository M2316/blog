"use client";
import { getContentList } from "@/actions/notion";
import { Content, Tag } from "@/utils/dataPaser";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideNav(){
  const [sideNav, setSideNav] = useState<Tag[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const groupName = searchParams.get("groupName");

  useEffect(()=>{
    const fetchContentList = async () => {
      setIsLoading(true);
      const response = await getContentList({
          filter: {
            property: "상태",
            status: {
              equals: "게시",
            },
          },
        });
      
        if (!Array.isArray(response)) {
          console.error("Failed to fetch content list:", response);
          return null;
        }
      
        const contentList: Content[] = response;
      
        const groupContentList = contentList.filter(
          (content: Content) => content.groupId === id
        );
      
        const tagList: Tag[] = [];
      
        groupContentList.forEach((content:Content) =>{
          content.tags?.forEach((tag:Tag)=>{
            if(tagList.findIndex((alreadyTag:Tag)=>alreadyTag.name === tag.name) >= 0) return;
            tagList.push(tag);
          })
        })
        setSideNav(tagList);
        setIsLoading(false);
    }
    fetchContentList();
  },[id])
  
  return (
    <>
      {/* 모바일 토글 버튼 */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden fixed bottom-10 right-4 z-20 bg-[#fbfbfb] p-2 rounded-md shadow-md border border-gray-300"
        aria-label={isExpanded ? "메뉴 닫기" : "메뉴 열기"}
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* 사이드 네비게이션 */}
      <div className={`
        fixed z-10 bg-[#fbfbfb] shadow-lg rounded-lg
        md:top-1/2 md:right-8 md:transform md:-translate-y-1/2 md:p-5 md:border-y-4 md:border-gray-300 md:hover:border-black
        ${isExpanded 
          ? 'bottom-20 right-4 p-3 border border-gray-300 w-48 max-h-[80vh] overflow-y-auto' 
          : 'hidden md:block bottom-20 right-4 p-3 border border-gray-300 w-48 max-h-[80vh] overflow-y-auto'
        }
      `}>
        <ul className="w-full">
          <li className="flex flex-col justify-center items-around gap-2 md:gap-4">  
            {groupName && 
              <h3 className="text-gray-400 font-bold hover:text-black hover:border-b-2 w-full text-sm md:text-base" data-id={id}>
                <Link href={`#${groupName}`}>
                  {groupName}
                </Link>
              </h3>
            }      
            {sideNav && sideNav.map((tag:Tag, idx:number)=>(
              <Link 
                href={`#${tag.name}`} 
                key={`side-bar-${tag.name}-${idx}`} 
                className="text-gray-400 hover:text-black font-bold hover:border-b-2 w-full text-sm md:text-base"
                onClick={() => setIsExpanded(false)}
              >
                {tag.name}
              </Link>
            ))}      
            {isLoading && 
              <div className="flex justify-center items-center w-full h-full">
                <svg
                className="animate-spin h-4 w-4 md:h-5 md:w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
                </svg>
                <p className="text-gray-400 font-bold ml-2 text-xs md:text-sm">Loading...</p>
              </div>
            }
          </li>
        </ul>
      </div>
    </>
  )
}