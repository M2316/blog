"use client";

import { Comment, CommentSubmitForm, commentUpdateFetch, getCommentList } from "@/actions/notion";
import createAtTimeCalc from "@/utils/createAtTimeCalc";
import { CommentObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useEffect, useRef, useState } from "react";

export default function ContentComment({paramsId}:{paramsId:string}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const writerRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [commentList , setCommentList] = useState<Comment[]>([]);

  useEffect(()=>{
    const commentFetch = async ()=>{
      const result = await getCommentList(paramsId);
      if(!!result){
        setCommentList(result);
      }else{
        alert("댓글을 불러오는 데 실패했습니다.");
      }
    }
    commentFetch();
  },[paramsId])

  const changeHandler = () => {
    if (textRef.current) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  };

  const commentSubmitHandler = async()=>{

    const writer = writerRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    if(!writer || !password){
      alert("작성자와 비밀번호를 입력해주세요.");
      return
    }
    if(!textRef.current?.value){
      alert("댓글을 입력해주세요.");
      return
    }
    if(textRef.current?.value.length > 500){
      alert("댓글은 500자 이내로 작성해주세요.");
      return
    }
    if(textRef.current?.value.length < 5){
      alert("댓글은 5자 이상 작성해주세요.");
      return
    }
    if(writer.length > 10){
      alert("작성자는 10자 이내로 작성해주세요.");
      return
    }
    if(writer.length < 2){
      alert("작성자는 2자 이상 작성해주세요.");
      return
    }
    if(password.length > 10){
      alert("비밀번호는 10자 이내로 작성해주세요.");
      return
    }
    if(password.length < 4){
      alert("비밀번호는 4자 이상 작성해주세요.");
      return
    }
    const commentData:CommentSubmitForm = {
      writer: writerRef.current?.value || "",
      password: passwordRef.current?.value || "",
      comment: textRef.current?.value || ""
    }
    const flag = await commentUpdateFetch(paramsId, commentData);
    if(!!flag){
      alert("댓글이 등록되었습니다.");
      textRef.current!.value = "";
      textRef.current!.style.height = `auto`;
    }else{
      alert("댓글 등록에 실패했습니다.");
    }
    return 
  }

  return (
    <section className="flex w-full flex-col gap-20">
      <div className="flex flex-col items-start w-full gap-5">
        <h3>{commentList.length || 0}개의 댓글</h3>
        <div className="flex flex-col w-full gap-3">
          <textarea
            className="border border-gray-300 rounded-xl p-5 w-full resize-false outline-none resize-none overflow-hidden"
            placeholder="댓글을 작성하세요."
            ref={textRef}
            onChange={() => {
              changeHandler();
            }}
          />
          <div className="flex justify-between w-full ">
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded-xl p-3 px-5 outline-none"
                placeholder="작성자를 입력하세요."
                type="text"
                ref={writerRef}
              />
              <input
                className="border border-gray-300 rounded-xl p-3 px-5 outline-none"
                placeholder="비밀번호를 입력하세요."
                type="password"
                ref={passwordRef}
              />
            </div>
            <div>
              <button className="border border-gray-300 rounded-xl p-3 px-5 bg-(--main-color) text-white w-40 cursor-pointer" onClick={commentSubmitHandler}>
                댓글 등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        {
          commentList.map((comment,idx)=>{
            return (
              <CommentItem key={`comment-item-${idx}`} comment={comment}/>
            )
          })
        }
      </div>
    </section>
  );
}

function CommentItem({comment}:{comment:Comment}) {
  return (
    <div className="flex flex-col gap-2 py-5 border-b-4 border-gray-100">
      <p className="font-bold text-xl">{comment.writer}</p>
      <p className="font-bold text-sm text-gray-400">
        {createAtTimeCalc(comment.created_time)}
      </p>
      <div>
        <span className="px-5 block text-ellipsis text-sm">
          {/* {comment.rich_text.map((item, index) => {
            return (
              <p key={`comment-id-${comment.id}-${index}`} className="text-sm text-gray-500">
                {item.plain_text}
              </p>
            )
          })} */}
              <p className="text-sm text-gray-500">
                {comment.content}
              </p>
        </span>
      </div>
    </div>
  );
}
