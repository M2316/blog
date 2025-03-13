import SideNav from "./side-nav";

export default function Layout({ children } : { children: React.ReactNode}){
    return (
        <>
        {children}
        <SideNav/>
        </>
    )

}