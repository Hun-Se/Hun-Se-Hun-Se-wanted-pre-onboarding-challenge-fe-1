import { useCallback } from "react";

type HandlersType = {
  [status: number | string]: any;
};
export const useApiError = (handlers?: HandlersType) => {
  const handle403 = () => {
    console.log("403에러");
  };

  const handle500 = () => {
    // 500 상태 관련 로직
    console.log("500에러");
  };

  const handleDefault = () => {
    // 기본 에러 처리 로직
    console.log("기본에러");
  };

  const defaultHandlers: HandlersType = {
    403: {
      default: handle403,
    },
    500: {
      default: handle500,
    },
    default: handleDefault,
  };

  const handleError = useCallback(
    (error: any) => {
      const httpStatus = error.result;
      const errorCode = error.data.errorCode;
      const errorMessage = error.data.errorMessage;

      switch (true) {
        case handlers && !!handlers[httpStatus]?.[errorCode]?.[errorMessage]:
          handlers![httpStatus][errorCode][errorMessage]();
          break;

        case handlers && !!handlers[httpStatus]?.[errorCode]:
          handlers![httpStatus][errorCode](error);
          break;

        case handlers && !!handlers[httpStatus]:
          handlers![httpStatus].default(error);
          break;

        case !!defaultHandlers[httpStatus][errorCode]:
          defaultHandlers[httpStatus][errorCode]();
          break;

        case !!defaultHandlers[httpStatus]:
          defaultHandlers[httpStatus].default();
          break;

        default:
          defaultHandlers.default();
      }
    },
    [handlers]
  );

  return { handleError };
};
