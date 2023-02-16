import React from "react";

interface Props {
  isRefresh?: boolean;
  message?: string;
  onRefresh?: () => void;
  onReset?: () => void;
}

const Error = (props: Props) => {
  return (
    <>
      <h2>페이지 오류</h2>
      <p>{props.message}</p>
      <button onClick={props.onRefresh}>새로고침</button>
      <button onClick={props.onReset}>초기화</button>
    </>
  );
};

export default Error;
