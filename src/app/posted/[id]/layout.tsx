import ContentComment from "@/components/content-comment";

export default function Layout({children}: {children: React.ReactNode}){
    
    return (
        <div className="flex flex-col justify-center gap-20">
            {children}
            <ContentComment/>
        </div>
    )

}