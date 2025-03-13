"use client";

import { useRef } from "react";

export default function ContentComment() {
  const textRef = useRef<any>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textRef.current) {
      textRef.current.style.height = `auto`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  };

  return (
    <section className="flex flex-col gap-20">
      <div className="flex flex-col items-start w-full gap-5">
        <h3>2개의 댓글</h3>
        <div className="flex flex-col w-full gap-3">
          <textarea
            className="border border-gray-300 rounded-xl p-5 w-full resize-false outline-none"
            placeholder="댓글을 작성하세요."
            ref={textRef}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
          <div className="flex justify-between w-full ">
            <div className="flex gap-3">
              <input
                className="border border-gray-300 rounded-xl p-3 px-5 outline-none"
                placeholder="작성자를 입력하세요."
                type="text"
              />
              <input
                className="border border-gray-300 rounded-xl p-3 px-5 outline-none"
                placeholder="비밀번호를 입력하세요."
                type="password"
              />
            </div>
            <div>
              <button className="border border-gray-300 rounded-xl p-3 px-5 bg-(--main-color) text-white w-40">
                댓글 등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </section>
  );
}

function CommentItem() {
  return (
    <div className="flex flex-col gap-2 py-5 border-b-4 border-gray-100">
      <p className="font-bold text-xl">comment-write-name</p>
      <p className="font-bold text-sm text-gray-400">
        2025년 02월 12일 12:02:22
      </p>
      <div>
        <span className="px-5 block text-ellipsis text-sm">
          좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~좋은 글을
          작성해 주셔서 감사합니다.~~~~~좋은 글을 작성해 주셔서
          감사합니다.~~~~~좋은 글을 작성해 주셔서 감사합니다.~~~~~
        </span>
      </div>
    </div>
  );
}
