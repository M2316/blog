import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
 
export const notion = new NotionAPI();
 
export async function getData(rootPageId: string) {

    const page = await notion.getPage(rootPageId);
  return page;
}


export const notionDatabase = new Client({
    auth: process.env.NEXT_PUBLIC_API_NOTION_TOKEN,
  });