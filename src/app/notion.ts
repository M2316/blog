'use server';
import { getErrorMessage } from '@/utils/errorParser';
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

export interface NotionPageInfo {
  title: string;
  subTitle: string;
  createdTime: string;
  lastEditedTime: string;
  views: number;
  viewsUser: string;

}
const NEXT_PUBLIC_API_NOTION_TOKEN = process.env.NEXT_PUBLIC_API_NOTION_TOKEN;
const NEXT_PUBLIC_API_NOTION_VERSION = process.env.NEXT_PUBLIC_API_NOTION_VERSION;

const notion = new NotionAPI();

export async function getNotionPage(rootPageId: string) {
  try {
    const page = await notion.getPage(rootPageId);

    return page;
  } catch (e) {
    console.log(e);
  }
}

//페이지 정보를 가져오는 fetch
export async function getPageInfo(pageId: string): Promise<NotionPageInfo> {
  try {
    const result = await notionDatabase.pages.retrieve({
      page_id: pageId
    });

    const pageInfo: NotionPageInfo = {
      title: "",
      subTitle: "",
      createdTime: "",
      lastEditedTime: "",
      views: 0,
      viewsUser: ""      
    }
 
    if ('properties' in result) {
      const titleProperty = result.properties["이름"] as { title: { plain_text: string }[] };
      pageInfo.title = titleProperty.title[0].plain_text;

      const createdTimeProperty = result.properties["생성 일시"] as { created_time: string };
      pageInfo.createdTime = createdTimeProperty.created_time;

      const lastEditedTimeProperty = result.properties["수정일"] as { last_edited_time: string };
      pageInfo.lastEditedTime = lastEditedTimeProperty.last_edited_time;

      const viewsProperty = result.properties["조회수"] as { number: number };
      pageInfo.views = viewsProperty.number;

      const subTitle = result.properties["부제목"] as {rich_text: { plain_text: string}[] }
      pageInfo.subTitle = subTitle.rich_text[0].plain_text;

      const viewsUser = result.properties["방문자정보"] as {rich_text: { plain_text: string}[] }
      if(viewsUser.rich_text.length > 0){
        pageInfo.viewsUser = viewsUser.rich_text[0].plain_text;
      }      

    }
    console.log(result)


    return pageInfo;
  } catch (err) {
    throw new Error(`페이지 정보 요청이 실패 했습니다.🚫 \n reason : ${getErrorMessage(err)}`)
  }
}

export const viewsUpdateFetch = async (blockId: string, pageInfo: NotionPageInfo, userUuid: string) => {

  const returnVisitor = pageInfo.viewsUser.split(",").find((uuid)=>uuid === userUuid);
      if(!returnVisitor){
        pageInfo.views = pageInfo.views + 1;
        pageInfo.viewsUser = pageInfo.viewsUser+","+userUuid;
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
        "방문자정보":{
          rich_text:[
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
    return pageInfo.views;
}


const notionDatabase = new Client({
  auth: process.env.NEXT_PUBLIC_API_NOTION_TOKEN,
});