import { useCallback } from "react";

type HandlersType = {
  [status: number | string]: any;
};
export const useApiError = (handlers?: HandlersType) => {
  const handle403 = () => {
    // 세션 만료 팝업 호출
  };

  const handle500 = () => {
    // 500 상태 관련 로직
  };

  const handleDefault = () => {
    // 기본 에러 처리 로직
  };

  const defaultHandler = {
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
      }
    },
    [handlers]
  );
};
