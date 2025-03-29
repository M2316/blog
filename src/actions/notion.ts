'use server';
import { getErrorMessage } from '@/utils/errorParser';
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Content, getPageProperties } from '@/utils/dataPaser';

export interface NotionPage extends PageObjectResponse {
  query?: string;
}
const NEXT_PUBLIC_API_NOTION_TOKEN = process.env.NEXT_PUBLIC_API_NOTION_TOKEN;
const NEXT_PUBLIC_API_NOTION_VERSION = process.env.NEXT_PUBLIC_API_NOTION_VERSION;
const NEXT_PUBLIC_API_NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID;

const notion = new NotionAPI();

export async function getContentList(body: any) {
  try {
    const result = await notionDatabase.databases.query({
      database_id: NEXT_PUBLIC_API_NOTION_DATABASE_ID || "",
      filter: body.filter,
      sorts: [
        {
          property: "생성 일시",
          direction: "descending"
        }
      ]
    }).then((res) => res.results);

    const contentList: Content[] = result.map((content) => {
      return getPageProperties(content as NotionPage);
    })

    return contentList;

  } catch (e) {
    throw new Error(`🚫데이터를 불러올 수 없습니다. : ${getErrorMessage(e)}`);
  }
}

export async function getNotionPage(rootPageId: string) {
  try {
    const page = await notion.getPage(rootPageId);

    return page;
  } catch (e) {
    console.log(e);
  }
}

//페이지 정보를 가져오는 fetch
export async function getPageInfo(pageId: string): Promise<Content> {
  try {
    const result = await notionDatabase.pages.retrieve({
      page_id: pageId
    }) as NotionPage;

    const pageInfo = getPageProperties(result);


    return pageInfo;
  } catch (err) {
    throw new Error(`페이지 정보 요청이 실패 했습니다.🚫 \n reason : ${getErrorMessage(err)}`)
  }
}

export const viewsUpdateFetch = async (blockId: string, pageInfo: Content, userUuid: string) => {

  const returnVisitor = pageInfo.viewsUser?.split(",").find((uuid) => uuid === userUuid);
  if (!returnVisitor) {
    pageInfo.views = pageInfo.views + 1;
    pageInfo.viewsUser = pageInfo.viewsUser + "," + userUuid;
  }

  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      "Notion-Version": NEXT_PUBLIC_API_NOTION_VERSION || "",
      "Authorization": `Bearer ${NEXT_PUBLIC_API_NOTION_TOKEN || ""}`
    },
    body: JSON.stringify({
      properties: {
        "조회수": {
          number: pageInfo.views
        },
        "방문자정보": {
          rich_text: [
            {
              text: {
                content: `${pageInfo.viewsUser}`
              }
            }
          ]
        }
      }
    })
  };
  fetch(`https://api.notion.com/v1/pages/${blockId}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
    console.log(NEXT_PUBLIC_API_NOTION_DATABASE_ID)
    console.log(NEXT_PUBLIC_API_NOTION_TOKEN)
  return pageInfo.views;
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


const notionDatabase = new Client({
  auth: process.env.NEXT_PUBLIC_API_NOTION_TOKEN,
});