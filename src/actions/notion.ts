'use server';
import { getErrorMessage } from '@/utils/errorParser';
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { CommentObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Content, getPageProperties } from '@/utils/dataPaser';

export interface NotionPage extends PageObjectResponse{
  query?: string;
}

export interface CommentSubmitForm{
  writer: string;
  password: string;
  comment: string;
}

export interface Comment extends CommentObjectResponse{
  id: string;
  writer: string;
  password: string;
  content: string;
  created_time: string;
}
const NEXT_PUBLIC_API_NOTION_TOKEN = process.env.NEXT_PUBLIC_API_NOTION_TOKEN;
const NEXT_PUBLIC_API_NOTION_VERSION = process.env.NEXT_PUBLIC_API_NOTION_VERSION;
const NEXT_PUBLIC_API_NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID;

const notionAPI = new NotionAPI({
  authToken: NEXT_PUBLIC_API_NOTION_TOKEN
});

const notionDatabase = new Client({
  auth: process.env.NEXT_PUBLIC_API_NOTION_TOKEN,
});

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
  try {
    fetch(`https://api.notion.com/v1/pages/${blockId}`, options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  } catch (err) {
    throw new Error(`조회수 업데이트 요청이 실패 했습니다.🚫 \n reason : ${getErrorMessage(err)}`)
  }
  return pageInfo.views;
}

export const getContentDetailFetch = async <T>(postedId: string): Promise<T> => {
  try {
    const recordMap = await notionAPI.getPage(postedId);
    return recordMap as T;
  } catch (error) {
    throw new Error(`Failed to fetch content🚫 Reason: ${getErrorMessage(error)}`);
  }
}

export const commentUpdateFetch = async (pageId: string, commentData:CommentSubmitForm):Promise<boolean> => {

  if (!commentData.comment && commentData.comment.length < 1) {
    throw new Error("댓글을 입력해주세요.🚫")
  }
  try {
    const comment = `${commentData.writer}%SEPARATOR%${commentData.password}%SEPARATOR%${commentData.comment}`;
    const response = await notionDatabase.comments.create({
      parent: { page_id: pageId },
      rich_text: [
        {
          text: {
            content: comment,
          },
        },
      ],
    })
    console.log("댓글 등록 성공", response);
  } catch (err) {
    throw new Error(`댓글 등록 요청이 실패 했습니다.🚫 \n reason : ${getErrorMessage(err)}`)
  }
  return true;
}

export const getCommentList = async (pageId: string) => {
  try {
    const response = await notionDatabase.comments.list({
      block_id: pageId,
    });
    const commentList = response.results.map((comment) => {
      const commentData = comment.rich_text.map((item) => item.plain_text).join(" ");
      const [writer, , content] = commentData.split("%SEPARATOR%");
      return {
        id: comment.id,
        created_time: comment.created_time,
        writer: writer,
        content: content,
      }
    }) as Comment[];
    commentList.sort((a, b) => {
      return new Date(b.created_time).getTime() - new Date(a.created_time).getTime();
    })
    
    return commentList;
  } catch (err) {
    throw new Error(`댓글 목록 요청이 실패 했습니다.🚫 \n reason : ${getErrorMessage(err)}`)
  }
}

export const titleSearchFetch = async <T>(findTitle:string):Promise<T>=>{
  try{
    const result = await notionDatabase.search({
      query: findTitle,
      filter: {
        value: 'page',
        property: 'object'
      },
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time'
      },
    }).then((res)=> res.results);
    const contentList = result.map((content)=>{
      return getPageProperties(content as NotionPage);
    });
    return contentList as T;
  }catch(err){
    throw new Error(`제목 검색 요청이 실패 했습니다.🚫 \n reason : ${getErrorMessage(err)}`)
  }
}