'use server';
import { ParseToContent } from "@/utils/dataPaser";
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const NEXT_PUBLIC_API_NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID;
const NEXT_PUBLIC_API_NOTION_TOKEN = process.env.NEXT_PUBLIC_API_NOTION_TOKEN;
const NEXT_PUBLIC_API_NOTION_VERSION = process.env.NEXT_PUBLIC_API_NOTION_VERSION;
const NEXT_PUBLIC_API_NOTION_URL = process.env.NEXT_PUBLIC_API_NOTION_URL;
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${NEXT_PUBLIC_API_NOTION_TOKEN || ""}`,
    "Notion-Version": NEXT_PUBLIC_API_NOTION_VERSION || ""
}

export interface Content {
    id?: string;
    title?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: Tag[];
    contentNumber?: number;
    category?: string;
    subtitle?: string;
    views: number;
    group?: string;
    groupId?: string;
    groupColor?: string;
    thombnail?: string;
}
export interface Tag {
    color?: string;
    name: string;
}

export type Result = PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse;

export interface RequestBody {
    filter? : {
        property?: string;
        status?: {
            equals?: string;
        }
    }
    
}

export async function getContentList(body:RequestBody):Promise<Content[]> {
    try {
        const url = `${NEXT_PUBLIC_API_NOTION_URL}/v1/databases/${NEXT_PUBLIC_API_NOTION_DATABASE_ID}`;
        const response = await fetch(`${url}/query`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
            
        })
        const contentList = await response.json().then((res)=>res.results);
        console.log(contentList);



        const result: Content[] = contentList.map((content: Result): Content => {
            return ParseToContent(content);
        });

        return result;
    } catch (e) {
        throw new Error(` 데이터를 불러올 수 없습니다. : ${e}`);
    }
}