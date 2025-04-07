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
  let nextContentList = latestContentList.map((_, idx)=> idx);
  if(latestContentList.length > 3){
    nextContentList = await getRandomNumbers(0, latestContentList.length - 1, 3);
  }


  return (
    <section className="flex flex-col items-center w-full gap-6 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center w-full space-y-4">
        <p className="text-3xl sm:text-2xl font-bold w-full">{`${pageInfo.title}`}</p>
        <div className="flex flex-col sm:flex-row justify-between w-full text-sm text-gray-600">
          <div className="flex flex-col gap-1">
            <p>{createAtTimeCalc(pageInfo.createdAt)}</p>
            <Views pageInfo={pageInfo} paramsId={paramsId}/>
          </div>
          <p className="text-gray-500 mt-2 sm:mt-0">
            마지막 수정 : {createAtTimeCalc(pageInfo.updatedAt)}
          </p>
        </div>
      </div>

      <article id="posted-detail" className="w-full">
        <PostedDetail postedId={paramsId} />
      </article>

      <div className="w-full space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          다음 읽을 글 🌈
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nextContentList.map((value:number) => (
            <li key={`next-card-${value}`} className="transform transition-transform hover:scale-[1.02]">
              <NextContentCard content={latestContentList[value]}/>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full mt-4">
        <ContentComment paramsId={paramsId}/>
      </div>
    </section>
  );
}


// 0~10 사이의 랜덤한 숫자 3개 생성[중복되지 않도록]
const getRandomNumbers = async (min: number, contentListLength: number, nextCountSize: number) => {
  // 가능한 숫자의 범위가 요청된 개수보다 작은 경우 처리
  const possibleNumbers = contentListLength - min + 1;
  if (nextCountSize > possibleNumbers) {
    nextCountSize = possibleNumbers;
  }
  
  const numbers = new Set<number>();
  for (let i = 0; i < nextCountSize; i++) {
    const randomNum = Math.floor(Math.random() * (contentListLength - min + 1)) + min;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
};