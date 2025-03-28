'use client';
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { getContentDetailFetch } from "@/actions/content-detail.action";

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
// const Pdf = dynamic(
//   () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
//   {
//     ssr: false
//   }
// )
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

export default function PostedDetail({ postedId }: { postedId: string }) {
  

  

  const [recordMap, setRecordMap] = useState<ExtendedRecordMap>();

  useEffect(() => {

    const fetchPosted = async (postedId : string)=>{
      const recordMap = getContentDetailFetch<ExtendedRecordMap>(postedId);
      // setRecordMap(recordMap);
    }
    // const fetchPosted = async (postedId: string)=> {
    //   const posted = await fetch(`/api/notion-content-detail?rootPageId=${postedId}`);
    //   const recordMap: ExtendedRecordMap = await posted.json().then((data:ExtendedRecordMap)=>data);
    //   setRecordMap(recordMap);
    // };
    fetchPosted(postedId);
  });

  if (!recordMap) {
    return <div className="skeleton">
    <div className="skeleton-header"></div>
    <div className="skeleton-content">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  </div>;;
  }

  return <NotionPage recordMap={recordMap} />;
}

export function NotionPage({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        nextImage: Image,
        nextLink: Link,
      }}
    />
  );
}
