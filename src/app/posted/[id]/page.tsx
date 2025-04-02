import { getContentList, getPageInfo } from "@/actions/notion";
import NextContentCard from "@/components/card/next-content-card";
import ContentComment from "@/components/content-comment";
import PostedDetail, { Views } from "@/components/posted-detail";
import createAtTimeCalc from "@/utils/createAtTimeCalc";



export default async function Page({params}: {params: Promise<{id:string}>}) {
  
  const {id : paramsId} = await params;

  const pageInfo = await getPageInfo(paramsId);

  // 데이터를 서버에서 가져옵니다.
  const contentList = await getContentList({
    filter: {
      property: "상태",
      status: {
        equals: "게시",
      },
    },
    sort:{
      property: "createdAt",
      direction: "descending",
    }
  });
  const latestContentList = contentList.filter((content)=> content.id !== paramsId);

  const randomNumbers = getRandomNumbers(0, latestContentList.length, 3);


  return (
    <section className="flex flex-col items-center w-full gap-10 px-5 sm:px-0">
      <div className="flex flex-col items-center w-full ">
        <p className="text-2xl sm:text-4xl font-bold my-(--header-margin-1)">{`${pageInfo.title}`}</p>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <p className="">{createAtTimeCalc(pageInfo.createdAt)}</p>
            <Views pageInfo={pageInfo} paramsId={paramsId}/>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-gray-400">
              마지막 수정 : {createAtTimeCalc(pageInfo.updatedAt)}
            </p>
          </div>
        </div>
      </div>
      <article id="posted-detail" className="w-full flex justify-center min-h-200 sm:p-10 sm:border sm:border-gray-300 rounded-xl bg-gray-100 shadow-md ">
        <PostedDetail postedId={paramsId} />
      </article>
      <div className="flex flex-col justify-start w-full gap-3">
        <h3 className="font-bold my-header-margin-3 flex w-full sm:px-0 px-5">
          NEXT. 다음 읽을 글 🌈
        </h3>
        <ul className="flex flex-col sm:flex-row sm:justify-between gap-5 px-5 sm:px-0">
          {
            randomNumbers.map((value:number)=>{
              return (
                <li className="w-full sm:w-1/3" key={`next-card-${value}`}>
                  <NextContentCard content={latestContentList[value]}/>
                </li>
              )
            })
          }
        </ul>
      </div>
      <ContentComment paramsId={paramsId}/>
    </section>
  );
}


// 0~10 사이의 랜덤한 숫자 3개 생성[중복되지 않도록]
const getRandomNumbers = (min: number, max: number, count: number) => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
};