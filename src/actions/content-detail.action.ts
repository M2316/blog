'use server';

import { NotionAPI } from "notion-client";


const NEXT_PUBLIC_API_NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID;
const NEXT_PUBLIC_API_NOTION_TOKEN = process.env.NEXT_PUBLIC_API_NOTION_TOKEN;
const NEXT_PUBLIC_API_NOTION_VERSION = process.env.NEXT_PUBLIC_API_NOTION_VERSION;
const NEXT_PUBLIC_API_NOTION_URL = process.env.NEXT_PUBLIC_API_NOTION_URL;
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${NEXT_PUBLIC_API_NOTION_TOKEN || ""}`,
    "Notion-Version": NEXT_PUBLIC_API_NOTION_VERSION || ""
}



export const getPostedInfo = async <T>(blockId:string): Promise<T> => {
    const url = `${NEXT_PUBLIC_API_NOTION_URL}/v1/databases/${NEXT_PUBLIC_API_NOTION_DATABASE_ID}`;
    try{
        const result = await (await fetch(`${url}/blocks/${blockId}`,{
            headers
        })).json().then((res)=>res.data);
        return result;
    }catch(error){
        const errorType = error instanceof Error ? error.name : 'Unknown Error';
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Posted content not found🚫 Type: ${errorType}, Reason: ${errorMessage}`);
    }
}




export const getContentDetailFetch = async <T>(postedId: string): Promise<T> => {
    try {
        const api = new NotionAPI({
            authToken: NEXT_PUBLIC_API_NOTION_TOKEN
        });
        const recordMap = await api.getPage(postedId);
        return recordMap as T;
    } catch (error) {
        const errorType = error instanceof Error ? error.name : 'Unknown Error';
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to fetch content🚫 Type: ${errorType}, Reason: ${errorMessage}`);
    }
}