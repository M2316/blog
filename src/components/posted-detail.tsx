'use client';

import React from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Link from "next/link";
import Image from "next/image";
import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'

function SkeletonUI() {
  return (
    <div className="animate-pulse space-y-4 w-full">
      <div className="h-100 bg-gray-400 rounded w-full"></div>
      <div className="h-12 bg-gray-400 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        <div className="h-4 bg-gray-400 rounded w-4/6"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-400 rounded w-full"></div>
        <div className="h-4 bg-gray-400 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export default function PostedDetail({ postedId }: { postedId: string }) {
  const [recordMap, setRecordMap] = React.useState<ExtendedRecordMap | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const posted = await fetch(`/api/notion-content-detail?rootPageId=${postedId}`);
        const data = await posted.json();
        setRecordMap(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [postedId]);

  if (isLoading) {
  return <div className="w-full flex justify-center">
      <SkeletonUI />
      </div>;
    
  }
  
  if (!recordMap) return null;
  
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
