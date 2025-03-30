import { getPageInfo } from "@/actions/notion";
import NextContentCard from "@/components/card/next-content-card";
import ContentComment from "@/components/content-comment";
import PostedDetail, { Views } from "@/components/posted-detail";
import createAtTimeCalc from "@/utils/createAtTimeCalc";



export default async function Page({params}: {params: Promise<{id:string}>}) {
  
  const {id : paramsId} = await params;

  const pageInfo = await getPageInfo(paramsId);

  return (
    <section className="flex flex-col items-center w-full gap-10">
      <div className="flex flex-col items-center w-full">
        <h2 className="my-(--header-margin-1)">{`${pageInfo.title}`}</h2>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <p className="">{createAtTimeCalc(pageInfo.createdAt)}</p>
            {/* <p className="text-xs text-gray-400">조회수 {pageInfo.views}</p> */}
            <Views pageInfo={pageInfo} paramsId={paramsId}/>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-gray-400">
              마지막 수정 : {createAtTimeCalc(pageInfo.updatedAt)}
            </p>
          </div>
        </div>
      </div>
      <article className="w-full flex justify-center min-h-200 p-10 border border-gray-300 rounded-xl bg-gray-100 shadow-md">
        <PostedDetail postedId={paramsId} />
      </article>
      <div className="flex flex-col justify-start w-full gap-3">
        <h3 className="font-bold my-header-margin-3 flex w-full">
          NEXT. 다음 읽을 글 🌈
        </h3>
        <ul className="flex justify-between gap-3">
          <li className="w-1/3">
            <NextContentCard />
          </li>
          <li className="w-1/3">
            <NextContentCard />
          </li>
          <li className="w-1/3">
            <NextContentCard />
          </li>
        </ul>
      </div>
      <ContentComment paramsId={paramsId}/>
    </section>
  );
}


