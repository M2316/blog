import { notionDatabase } from "@/app/notion";
import { ParseToContent } from "@/utils/dataPaser";
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const url = `${process.env.NEXT_PUBLIC_API_NOTION_URL}/databases/${process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID}/query`;

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
}
export interface Tag {
    color?: string;
    name: string;
}

export type Result = PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse;

export async function getContentList() {

    if (!process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID) {
        throw new Error("데이터베이스 아이디가 없습니다.");
    }
    const contents: QueryDatabaseResponse = await notionDatabase.databases.query({
        database_id: process.env.NEXT_PUBLIC_API_NOTION_DATABASE_ID,
    });

    const result: Content[] = contents.results.map((content: Result):Content => {

        return ParseToContent(content);
    });
    console.log(result);

    return result.filter((content:Content)=>content.status === "게시");
}
