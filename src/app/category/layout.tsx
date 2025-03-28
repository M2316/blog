import { Suspense } from "react";
import SideNav from "./side-nav";

export default function Layout({ children } : { children: React.ReactNode}){
    return (
        <>
        {children}
        <Suspense fallback={<div>Loading...</div>}>
            <SideNav />
        </Suspense>
        </>
    )

}