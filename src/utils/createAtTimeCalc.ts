import dayjs from "dayjs";

export default function createAtTimeCalc(createdAt: string) {

    const calcTime = dayjs().diff(dayjs(createdAt), "day") < 1
        ? dayjs().diff(dayjs(createdAt), "hour") < 1
            ? `${dayjs().diff(dayjs(createdAt), "minute")}분 전`
            : `${dayjs().diff(dayjs(createdAt), "hour")}시간 전`
        : dayjs(createdAt).format("YYYY-MM-DD");

    return calcTime;
}