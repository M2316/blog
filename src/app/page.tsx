import { getContentList } from "@/actions/notion";
import MainGroupCard from "@/components/card/main-group-card";
import MainItemCard from "@/components/card/main-item-card";
import MainCarousel from "@/components/main-carousel";
import colorParser,{ BLOG_COLOR } from "@/utils/colorParser";
import { Content } from "@/utils/dataPaser";

export const dynamic = "force-dynamic";



// 이 컴포넌트는 기본적으로 서버 컴포넌트로 동작합니다.
export default async function Home() {
  // 데이터를 서버에서 가져옵니다.
  const contentList = await getContentList({
    filter: {
      property: "상태",
      status: {
        equals: "게시",
      },
    },
  });

  // 최신 글과 인기 글을 정렬
  const latestContentList = JSON.parse(JSON.stringify(contentList))
    .sort((a: Content, b: Content) => {
      return (
        Date.parse(b.createdAt as string) - Date.parse(a.createdAt as string)
      );
    })
    .slice(0, 6);

  const hotContentList = JSON.parse(JSON.stringify(contentList))
    .sort((a: Content, b: Content) => {
      return b.views - a.views;
    })
    .slice(0, 6);

  // 그룹 데이터를 생성
  const contentGroup = [
    ...new Set(contentList.map((content: Content) => content.groupId)),
  ];

  const groupList = contentGroup.map((groupId) => {
    const groupItem: Content[] = contentList.filter(
      (content: Content) => content.groupId === groupId
    );

    const groupName = groupItem[0]?.group || "Unknown Group"; // 기본값 설정
    const groupColor = groupItem[0]?.groupColor || "#000000"; // 기본값 설정

    return {
      id: groupId,
      name: groupName,
      contentCount: groupItem.length,
      color: groupColor,
    };
  });

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 sm:px-6">
      <MainCarousel />
      <div className="flex flex-col w-full gap-8 max-w-7xl mx-auto">
        {/* 모바일에서만 보이는 폴더 섹션 */}
        <FolderSection groupList={groupList} className="lg:hidden w-full" />

        <div className="flex flex-col lg:flex-row w-full gap-8">
          <div className="flex flex-col w-full lg:w-2/3 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">NEW. 최근 올라온 글 🚀</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestContentList &&
                  latestContentList.map((content: Content) => (
                    <MainItemCard {...content} key={`latest ${content.id}`} />
                  ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">HOT. 가장 인기있는 글 🔥</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotContentList &&
                  hotContentList.map((content: Content) => (
                    <MainItemCard {...content} key={`hot ${content.id}`} />
                  ))}
              </div>
            </div>
          </div>

          {/* 데스크톱에서만 보이는 폴더 섹션 */}
          <FolderSection groupList={groupList} className="hidden lg:flex flex-col w-1/3" />
        </div>
      </div>
    </div>
  );
}





function FolderSection({ groupList, className }: { 
  groupList: Array<{ 
    id: string; 
    name: string; 
    contentCount: number; 
    color: string; 
  }>;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">폴더 📂</h3>
      <div className="flex flex-col gap-3">
        {groupList &&
          groupList.map((group, idx) => (
            <MainGroupCard
              key={`${idx}-${group.id}`}
              group={{
                ...group,
                id: group.id || "unknown-id",
                color: colorParser(group.color) as keyof typeof BLOG_COLOR,
              }}
              idx={idx}
            />
          ))}
      </div>
    </div>
  );
}