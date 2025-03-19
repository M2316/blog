import { Content } from "@/actions/content.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface PropsContent extends Content {}

export default function MainItemCard({
    id,
    title,
    status,
    createdAt,
    updatedAt,
    tags,
    contentNumber,
    category,
    subtitle,
    views
}:PropsContent) {

    console.log(`현재 시간 : ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`);
    console.log(`게시글 생성 시간 : ${dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}`);
    console.log(`${dayjs().diff(dayjs(createdAt),"day")}일 전`);
    return(
        <Link href={`posted/${id}`} className="w-62 flex flex-col items-center ">
            <div className="w-full relative">
                <Image className="rounded-3xl" alt="bg-img" src="/back-ground-4.jpg" width={280} height={170}/>
                <p className="absolute bottom-2 left-3 text-xs text-gray-100">조회수 {views}</p>
            </div>
            <div className="w-full">
                <h4 className="my-(--header-margin-4)">{title}</h4>
                <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">
                    {
                        dayjs().diff(dayjs(createdAt),"day") < 1 ? 
                            (dayjs().diff(dayjs(createdAt),"hour") < 1 ?
                                `${dayjs().diff(dayjs(createdAt),"minute")}분 전`:`${dayjs().diff(dayjs(createdAt),"hour")}시간 전`)
                        :dayjs(createdAt).format("YYYY-MM-DD")


                    }
                </p>
                <h5 className="text-gray-600">{subtitle}</h5>
                
            </div>
        </Link>
    );

}