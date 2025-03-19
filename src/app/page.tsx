import { Content, getContentList } from "@/actions/content.action";
import MainGroupCard from "@/components/card/main-group-card";
import MainItemCard from "@/components/card/main-item-card";
import MainCarousel from "@/components/main-carousel";

export default async function Home() {
  const contentList: Content[] = await getContentList();

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

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <MainCarousel />
      <div className="flex w-full justify-between ">
        <div className="flex flex-col w-4/6 gap-10">
          <div>
            <h3 className="my-(--header-margin-3)">NEW. 최근 올라온 글 🚀</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {latestContentList &&
                latestContentList.map((content: Content, idx: number) => (
                  <MainItemCard {...content} key={`latest ${content.id}`} />
                ))}
            </div>
          </div>
          <div>
            <h3 className="my-(--header-margin-3)">HOT. 가장 인기있는 글 🔥</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {hotContentList &&
                hotContentList.map((content: Content, idx: number) => (
                  <MainItemCard {...content} key={`hot ${content.id}`} />
                ))}
            </div>
          </div>
          <div>
            <h3 className="my-(--header-margin-3)">FIX. 서비스 개선 사항 🛠️</h3>
            <div className="flex flex-wrap justify-between gap-3">
              {hotContentList &&
                hotContentList.map((content: Content, idx: number) => (
                  <MainItemCard {...content} key={`fix ${content.id}`} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/6 pl-5">
          <h3 className="my-(--header-margin-3)">폴더 📂</h3>
          <div className="flex flex-col gap-4">
            <MainGroupCard group={"front-end"} />
            <MainGroupCard group={"back-end"} />
            <MainGroupCard group={"Dev-Ops"} />
          </div>
        </div>
      </div>
    </div>
  );
}
