import { ComponentType } from "react";
import useTokenValidation from "../hook/auth/useTokenValidation";

const withAuthValidation = (AuthComponent: ComponentType) => {
  const AuthCheckHandler = () => {
    const { isAuthority } = useTokenValidation();

    if (!isAuthority) {
      window.alert("토큰이 존재하지 않습니다.");
      window.location.href = "/auth";
      return <></>;
    }

    return <AuthComponent />;
  };

  return AuthCheckHandler;
};

export default withAuthValidation;
