import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

export async function getData(rootPageId: string) {
  try{
    const page = await notion.getPage(rootPageId);

    return page;
  }catch(e){
    console.log(e);
  }
}


export const notionDatabase = new Client({
  auth: process.env.NEXT_PUBLIC_API_NOTION_TOKEN,
});