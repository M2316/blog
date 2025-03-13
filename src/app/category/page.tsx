import CategoryItemCard from "@/components/card/category-item-card";
import { FaArrowDown } from "react-icons/fa";

function GroupComponent() {
  return (
    <article className="flex flex-col w-full gap-5">
      <div className="flex w-full">
        <h3 className="w-full border-b-2 border-gray-300 py-2">{"Next.js"}</h3>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"}/>
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
        <CategoryItemCard postedId={"category>pleaseInputPostedID~!"} />
      </div>
      <div className="w-full flex justify-center">
        <button className="shadow-xl bg-white rounded-full p-3 hover:bg-gray-200 cursor-pointer">
            <FaArrowDown className="text-[2.3rem]"/>
        </button>
      </div>
    </article>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <section className="flex flex-col items-center min-h-screen w-full">
      <div className="flex w-full justify-center">
        <h1 className="my-(--header-margin-1)">{q}</h1>
      </div>
      <div className="w-full flex flex-col items-center gap-30">
        <GroupComponent />
        <GroupComponent />
        <GroupComponent />
      </div>
    </section>
  );
}
