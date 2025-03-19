import { Content, Result, Tag } from "@/actions/content.action";
import dayjs from "dayjs";

export const ParseToContent = (content: Result): Content => {

    const id: string = content.id;
    const title: string = content.properties["이름"].title[0].plain_text;
    const status: string = content.properties["상태"].status.name;
    const createdAt: string = dayjs(content.created_time).format("YYYY-MM-DD HH:mm:ss");
    const updatedAt: string = dayjs(content.last_edited_time).format("YYYY-MM-DD HH:mm:ss");
    const tags: Tag[] = content.properties["연관 태그"].multi_select.map((tag: Tag) => tag.name);
    const contentNumber: number = content.properties["게시글 ID"].unique_id.number;
    const category: string = content.properties["카테고리"].select?.name;
    const subtitle: string = content.properties["부제목"].rich_text[0]?.first;
    const views: number = content.properties["조회수"].number;

    return {
        id,
        title,
        status,
        createdAt,
        updatedAt,
        tags,
        contentNumber,
        category,
        subtitle,
        views
    }

}