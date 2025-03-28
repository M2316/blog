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
export const getContentDetailFetch = async <T>(postedId: string): Promise<T> => {
    const api = new NotionAPI();
    const recordMap = await api.getPage(postedId);
    return recordMap as T;
}