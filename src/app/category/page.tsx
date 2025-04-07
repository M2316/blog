import { getContentList } from "@/actions/notion";
import CategoryItemCard from "@/components/card/category-item-card";
import { Content, Tag } from "@/utils/dataPaser";
import { FaArrowDown } from "react-icons/fa";

// 타입 정의
type SearchParams = {
  id?: string;
  groupName?: string;
};

type GroupComponentProps = {
  tag?: Tag;
  contentList?: Content[];
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { id, groupName } = await searchParams;

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

  // 태그 목록 생성 로직 개선
  const tagList: Tag[] = groupContentList.reduce((acc: Tag[], content: Content) => {
    content.tags?.forEach((tag: Tag) => {
      if (!acc.some((existingTag) => existingTag.name === tag.name)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  return (
    <section className="flex flex-col items-center min-h-screen w-full px-4 md:px-6 lg:px-8">
      <div className="flex w-full justify-center py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{groupName}</h1>
      </div>
      <div className="w-full max-w-7xl flex flex-col items-center gap-8 md:gap-10">
        {tagList &&
          tagList.map((tag: Tag, idx: number) => {
            const tagContentList = groupContentList.filter((content: Content) => {
              const tagString = content.tags?.map((tag: Tag) => tag.name).join();
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
      </div>
    </section>
  );
}

function GroupComponent({ tag, contentList }: GroupComponentProps) {
  return (
    <article className="flex flex-col w-full gap-5" id={tag?.name}>
      <div className="flex w-full">
        <h3 className="w-full border-b-2 border-gray-300 py-2 text-lg md:text-xl font-semibold">
          📌{tag?.name}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {contentList &&
          contentList.map((content: Content, idx: number) => (
            <CategoryItemCard
              key={`category-item-${idx}`}
              postedId={content.id as string}
              content={content}
            />
          ))} 
      </div>
      {contentList && contentList.length > 6 && (
        <div className="w-full flex justify-center mt-4">
          <button className="shadow-lg bg-white rounded-full p-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <FaArrowDown className="text-2xl md:text-3xl" />
          </button>
        </div>
      )}
    </article>
  );
}
