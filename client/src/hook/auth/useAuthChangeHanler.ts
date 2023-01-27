import { useState } from "react";
import useAuthInputValidation from "./useAuthInputValidation";

const useAuthChangeHanler = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    emailMessage,
    passwordMessage,
    emailValidation,
    passwordValidation,
    emailValidateHandler,
    passwordValidateHandler,
  } = useAuthInputValidation();

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = event.target.value;
    emailValidateHandler(emailCurrent);
    setEmail(emailCurrent);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);
    passwordValidateHandler(passwordCurrent);
  };

  return {
    emailMessage,
    passwordMessage,
    emailValidation,
    passwordValidation,
    email,
    password,
    emailChangeHandler,
    passwordChangeHandler,
  };
};

export default useAuthChangeHanler;
