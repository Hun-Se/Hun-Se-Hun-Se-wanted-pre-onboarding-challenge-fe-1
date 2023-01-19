import { useEffect, useState } from "react";
import { ACCESS_TOKEN_KEY } from "../constant/token_constant";
import token from "../lib/token/token";

const useTokenValidation = () => {
  const [isAuthority, setIsAuthority] = useState(true);

  useEffect(() => {
    if (token.getToken(ACCESS_TOKEN_KEY) === null) {
      setIsAuthority(false);
    } else {
      setIsAuthority(true);
    }
  }, []);

  return { isAuthority };
};

export default useTokenValidation;
