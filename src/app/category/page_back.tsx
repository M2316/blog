'use client';
import { use, useEffect, useState } from "react";
import { Content, getContentList, Tag } from "@/actions/content.action";
import CategoryItemCard from "@/components/card/category-item-card";
import { FaArrowDown } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function Page() {

  const searchParmas = useSearchParams();
  const id = searchParmas.get("id");

  useEffect(()=>{
    const contentFacth = async ()=>{
      const contentList: Content[] = await getContentList({
        filter: {
          property: "상태",
          status: {
            equals: "게시",
          },
        },
      });
      if (!Array.isArray(contentList)) {
        console.error("Failed to fetch content list:", contentList);
        return null;
      }

      
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
    }
  contentFacth();

  },[]);

  return (
    <section className="flex flex-col items-center min-h-screen w-full">
      {/* <div className="flex w-full justify-center">
        <h1 className="my-(--header-margin-1)">{groupName}</h1>
      </div>
      <div className="w-full flex flex-col items-center gap-30">
        {tagList &&
          tagList.map((tag: Tag, idx: number) => {
            const tagContentList = groupContentList.filter((content:Content) =>{
              let tagString = content.tags?.map((tag:Tag)=>tag.name).join();
              return tagString && tagString.includes(tag.name);
            });

            return (
              <GroupComponent
                key={`category-group-${idx}`}
                contentList={tagContentList}
                tag={tag}
              />
            );
          })}
      </div> */}
    </section>
  );
}

function GroupComponent({
  tag,
  contentList,
}: {
  tag?: Tag;
  contentList?: Content[];
}) {
  return (
    <article className="flex flex-col w-full gap-5">
      <div className="flex w-full">
        <h3 className="w-full border-b-2 border-gray-300 py-2">
          📌{tag?.name}
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {contentList &&
          contentList.map((content: Content, idx: number) => {
            return (
              <CategoryItemCard
                key={`category-item-${idx}`}
                postedId={content.id as string}
                content={content}
              />
            );
          })}
      </div>
      {contentList && contentList.length > 6 && (
        <div className="w-full flex justify-center">
          <button className="shadow-xl bg-white rounded-full p-3 hover:bg-gray-200 cursor-pointer">
            <FaArrowDown className="text-[2.3rem]" />
          </button>
        </div>
      )}
    </article>
  );
}
