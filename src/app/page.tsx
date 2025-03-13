import MainGroupCard from "@/components/card/main-group-card";
import MainItemCard from "@/components/card/main-item-card";
import MainCarousel from "@/components/main-carousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <MainCarousel />
      <div className="flex w-full justify-between ">
        <div className="flex flex-col w-4/6 gap-10">
          <div>
            <h3 className="my-(--header-margin-3)">NEW. 최근 올라온 글 🚀</h3>
            <div className="flex flex-wrap justify-between gap-3">
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
            </div>
          </div>
          <div>
            <h3 className="my-(--header-margin-3)">HOT. 가장 인기있는 글 🔥</h3>
            <div className="flex flex-wrap justify-between gap-3">
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
            </div>
          </div>
          <div>
            <h3 className="my-(--header-margin-3)">FIX. 서비스 개선 사항 🛠️</h3>
            <div className="flex flex-wrap justify-between gap-3">
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
              <MainItemCard postedId={"main>pleseInputThePostedID"}/>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/6 pl-5">
          <h3 className="my-(--header-margin-3)">폴더 📂</h3>
          <div className="flex flex-col gap-4">
            <MainGroupCard group={"front-end"}/>
            <MainGroupCard group={"back-end"}/>
            <MainGroupCard group={"Dev-Ops"}/>
          </div>
        </div>
      </div>
    </div>
  );
}
