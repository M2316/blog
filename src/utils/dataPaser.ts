import { NotionPage } from "@/actions/notion";
import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Content {
    id: string;
    title: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    tags?: Tag[];
    contentNumber?: number;
    category?: string;
    subtitle?: string;
    views: number;
    group: string;
    groupId: string;
    groupColor?: string;
    thombnail?: string;
    viewsUser?: string;
}
export interface Tag {
    color?: string;
    name: string;
}

export interface NotionComment {
    created_by: string;
    created_time: string;
    discussion_id: string;
    id: string;
    last_edited_time: string;
    object: string;
    parent: {
        page_id: string;
        type: string;
    };
    rich_text: string[];
}


export const getPageProperties = (pageData: NotionPage) => {

    if (!("properties" in pageData)) {
        throw new Error("Invalid content type: properties not found");
    }
    const { properties } = pageData as { properties: Record<string, any> };
    const pageProperties = {} as Content;

    pageProperties["id"] = pageData.id;

    if ("title" in properties["이름"]) {
        pageProperties["title"] = properties["이름"].title.map((item: any) => item.plain_text).join(" ");
    }


    if ("rich_text" in properties["부제목"]) {
        pageProperties["subtitle"] = properties["부제목"].rich_text.map((item: any) => item.plain_text).join(" ");
    }

    if ("status" in properties["상태"]) {
        pageProperties["status"] = properties["상태"].status!.name;
    }


    if ("created_time" in properties["생성 일시"]) {
        pageProperties["createdAt"] = properties["생성 일시"].created_time;
    }


    if ("date" in properties["수정일"]) {
        pageProperties["updatedAt"] = properties["수정일"].date?.start
    }


    if ("multi_select" in properties["연관 태그"]) {
        pageProperties["tags"] = properties["연관 태그"].multi_select as Tag[];
    } else {
        pageProperties["tags"] = [];
    }

    if ("select" in properties["카테고리"]) {
        pageProperties["category"] = properties["카테고리"].select!.name;
    }


    if ("number" in properties["조회수"]) {
        pageProperties["views"] = properties["조회수"].number as number;
    } else {
        pageProperties["views"] = 0;
    }


    if ("select" in properties["그룹"]) {
        pageProperties["group"] = properties["그룹"].select!.name;
        pageProperties["groupId"] = properties["그룹"].select!.id;
        pageProperties["groupColor"] = properties["그룹"].select!.color;
    }


    if ("files" in properties["썸네일"] && properties["썸네일"].files.length > 0) {
        if ("external" in properties["썸네일"].files[0]) {
            pageProperties["thombnail"] = properties["썸네일"].files[0].external.url;
        } else if ("file" in properties["썸네일"].files[0]) {
            pageProperties["thombnail"] = properties["썸네일"].files[0].file.url;
        }
    }


    if ("rich_text" in properties["방문자정보"]) {
        pageProperties["viewsUser"] = properties["방문자정보"].rich_text.map((item: any) => item.plain_text).join(" ");
    }
    return pageProperties;
}