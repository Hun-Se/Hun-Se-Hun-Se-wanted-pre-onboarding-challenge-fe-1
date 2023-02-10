interface Props {
  isRefresh?: boolean;
  message?: string;
  onReset?: () => void;
}

const Error = (props: Props) => {
  return (
    <>
      <h2>페이지 오류</h2>
      <p>{props.message}</p>
      <button onClick={props.onReset}>새로고침</button>
    </>
  );
};

export default Error;
