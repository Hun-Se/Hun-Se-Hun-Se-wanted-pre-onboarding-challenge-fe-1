import { useState } from "react";
import useAuthInputValidation from "./useAuthInputValidation";

const useAuthChangeHanler = () => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

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
    setEnteredEmail(emailCurrent);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordCurrent = event.target.value;
    setEnteredPassword(passwordCurrent);
    passwordValidateHandler(passwordCurrent);
  };

  return {
    emailMessage,
    passwordMessage,
    emailValidation,
    passwordValidation,
    enteredEmail,
    enteredPassword,
    emailChangeHandler,
    passwordChangeHandler,
  };
};

export default useAuthChangeHanler;
