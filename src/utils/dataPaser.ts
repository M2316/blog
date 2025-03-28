import { Content, Result } from "@/actions/content.action";
import dayjs from "dayjs";

const getProperty = <T>(content: Result, key: string, type: string, callback: (value: any) => T): T | null => {
    if (!("properties" in content && content.properties)) {
        throw new Error("Invalid content type: properties not found");
    }
    const property = content.properties[key];
    if (property?.type === type) {
        return callback((property as any)[type]);
    }
    return null;
};

export const ParseToContent = (content: Result): Content => {
    if (!("properties" in content)) {
        throw new Error("Invalid content type: properties not found");
    }

    return {
        id: content.id,
        title: getProperty(content, "이름", "title", (title) =>
            Array.isArray(title) ? title[0]?.plain_text || "" : "") || "",
        status: getProperty(content, "상태", "status", (status) =>
            status && "name" in status ? status.name || "" : "") || "",
        createdAt: "created_time" in content
            ? dayjs(content.created_time).format("YYYY-MM-DD HH:mm:ss")
            : "",
        updatedAt: "last_edited_time" in content
            ? dayjs(content.last_edited_time).format("YYYY-MM-DD HH:mm:ss")
            : "",
        tags: getProperty(content, "연관 태그", "multi_select", (multi_select) =>
            Array.isArray(multi_select) ? multi_select.map((tag) => {return {name:tag.name,color:tag.color}}) : []) || [],
        contentNumber: getProperty(content, "게시글 ID", "number", (number) => number) || null,
        category: getProperty(content, "카테고리", "select", (select) =>
            select && "name" in select ? select.name || "" : "") || "",
        subtitle: getProperty(content, "부제목", "rich_text", (rich_text) =>
            Array.isArray(rich_text) ? rich_text[0]?.plain_text || "" : "") || "",
        views: getProperty(content, "조회수", "number", (number) => number) || 0,
        group: getProperty(content, "그룹", "select", (select) =>
            select && "name" in select ? select.name || "" : "") || "",
        groupId: getProperty(content, "그룹", "select", (select) =>
            select && "id" in select ? select.id || "" : "") || "",
        groupColor: getProperty(content, "그룹", "select", (select) =>
            select && "color" in select ? select.color || "" : "") || "",
        thombnail: getProperty(content, "썸네일", "files", (files) =>
            Array.isArray(files) ? files[0]?.file.url || "" : "") || "",
    };
};
