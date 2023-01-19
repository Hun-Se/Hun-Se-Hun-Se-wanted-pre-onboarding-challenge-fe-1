import { useState } from "react";
import { emailRegex, passwordRegex } from "../../constant/regexp_constant";

const useAuthInputValidation = () => {
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false);

  const emailValidateHandler = (emailCurrent: string) => {
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("올바른 이메일 형식을 입력해주세요!");
      setEmailValidation(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
      setEmailValidation(true);
    }
  };

  const passwordValidateHandler = (passwordCurrent: string) => {
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자 + 영문 + 특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setPasswordValidation(false);
    } else {
      setPasswordMessage("올바른 패스워드 형식입니다!");
      setPasswordValidation(true);
    }
  };

  return {
    emailMessage,
    passwordMessage,
    emailValidation,
    passwordValidation,
    emailValidateHandler,
    passwordValidateHandler,
  };
};

export default useAuthInputValidation;
