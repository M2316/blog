"use client";
import { getContentList } from "@/actions/notion";
import { Content, Tag } from "@/utils/dataPaser";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideNav(){

  const [sideNav, setSideNav] = useState<Tag[]>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <div className="flex items-center justify-center fixed top-1/2 transform -translate-y-1/2 right-32 text-white p-5 border-y-4 border-gray-300 hover:border-black 3xl:right-110">
          <ul className="w-full">
            <li className="flex flex-col justify-center items-around gap-4">  
              {
                groupName && 
                <h3 className="text-gray-400 font-bold hover:text-black hover:border-b-2 w-full" data-id={id}>
                  {groupName}
                </h3>
              }      
              {
                sideNav && sideNav.map((tag:Tag, idx:number)=>(
                  <Link href={`#${tag.name}`} key={`side-bar-${tag.name}-${idx}`} className="text-gray-400 hover:text-black font-bold hover:border-b-2  w-full">
                    {tag.name}
                  </Link>
                ))
              }      
              {
                isLoading && 
                <div className="flex justify-center items-center w-full h-full">
                  <svg
                  className="animate-spin h-5 w-5 text-gray-400"
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
                  <p className="text-gray-400 font-bold ml-2">Loading...</p>
                </div>
              }
            </li>
          </ul>
        </div>
    )
}