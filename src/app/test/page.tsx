'use client';

import { useEffect, useState } from "react";

export default function Page(){
    const [state , setState] = useState();
    useEffect(()=>{
        console.log("test");
        try{
            
            fetch("/api/notion-content-detail?rootPageId=1371f79d-1e07-80b6-8457-f095f04a2c8f").then((res)=>{
                res.json().then((data)=>{
                    console.log(data)
                    setState(data);
                })
            })
        }catch(e){
            console.log("error",e)
        }
    },[])
    
    return <div>test</div>
}