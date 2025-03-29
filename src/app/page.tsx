import { getContentList } from "@/actions/notion";
import MainGroupCard from "@/components/card/main-group-card";
import MainItemCard from "@/components/card/main-item-card";
import MainCarousel from "@/components/main-carousel";
import colorParser, { BLOG_COLOR } from "@/utils/colorParser";
import { Content } from "@/utils/dataPaser";





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
    <div className="flex flex-col items-center min-h-screen w-full">
      <MainCarousel />
      <div className="flex w-full justify-between ">
        <div className="flex flex-col w-4/6 gap-10">
          <div>
            <h3 className="my-(--header-margin-3)">NEW. 최근 올라온 글 🚀</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {latestContentList &&
                latestContentList.map((content: Content) => (
                  <MainItemCard {...content} key={`latest ${content.id}`} />
                ))}
            </div>
          </div>
          <div>
            <h3 className="my-(--header-margin-3)">HOT. 가장 인기있는 글 🔥</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {hotContentList &&
                hotContentList.map((content: Content) => (
                  <MainItemCard {...content} key={`hot ${content.id}`} />
                ))}
            </div>
          </div>
          <div>
            <h3 className="my-(--header-margin-3)">FIX. 서비스 개선 사항 🛠️</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {hotContentList &&
                hotContentList.map((content: Content) => (
                  <MainItemCard {...content} key={`fix ${content.id}`} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/6 pl-5">
          <h3 className="my-(--header-margin-3)">폴더 📂</h3>
          <div className="flex flex-col gap-4">
            {groupList &&
              groupList.map((group, idx) => (
                <MainGroupCard
                  key={`${idx}-${group.id}`}
                  group={{
                    ...group,
                    id: group.id || "unknown-id", // 기본값 설정
                    color: colorParser(group.color) as keyof typeof BLOG_COLOR, // 기본값 설정
                  }}
                  idx={idx}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}