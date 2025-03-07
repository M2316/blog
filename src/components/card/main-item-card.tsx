import Image from "next/image";

export default function MainItemCard(){

    return(
        <div className="w-62 flex flex-col items-center ">
            <div className="w-full relative">
                <Image className="rounded-3xl" alt="bg-img" src="/back-ground-4.jpg" width={280} height={170}/>
                <p className="absolute bottom-2 left-3 text-xs text-gray-100">조회수 2,231</p>
            </div>
            <div className="w-full">
                <h4>Title Container~!</h4>
                <p className="text-gray-400 text-xs mt-1 w-full flex justify-right">2025. 02. 14</p>
                <h5 className="text-gray-600">Sub Title Container~! content discription~~</h5>
            </div>
        </div>
    );

}