// 
// import { NextRequest, NextResponse } from "next/server";
// import { NotionAPI } from "notion-client";



// type searchParams = URLSearchParams;
// export async function GET(req: NextRequest) {

//   if(!req.url){
//     console.log("🚫no url");
//     return;
//   }
//   const { searchParams }:{searchParams: searchParams} = new URL(req.url); // URL에서 Query Parameters 추출
//   const rootPageId = searchParams.get("rootPageId"); // 특정 Query Parameter 가져오기

//   const api = new NotionAPI();

//   if (!rootPageId) {
//     return NextResponse.json({ error: "rootPageId is required" }, { status: 400 });
//   }

//   const recordMap = await api.getPage(rootPageId);    
//   console.log(recordMap);
//     return NextResponse.json(recordMap, { status: 200 }); // 데이터를 클라이언트로 반환
//   // try {

//   // } catch (error) {
//   //   return NextResponse.json({ error: "Internal Server Error", details: error }, { status: 500 });
//   // }
// } 