import React, { useState, Dispatch, SetStateAction } from "react";
import classes from "./SignUpForm.module.css";

interface signUpProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = (props: signUpProps) => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEnteredEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("올바른 이메일 형식을 입력해주세요!");
      setEmailValidation(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
      setEmailValidation(true);
    }
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = event.target.value;
    setEnteredPassword(passwordCurrent);

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

  const signUpHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const data = {
        email: enteredEmail,
        password: enteredPassword,
      };

      const res = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) alert(res.message);
          if (res.details) alert(res.details);
          backLoginHandler(event);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const backLoginHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    props.renderLogin(true);
  };

  return (
    <>
      <form className={classes["form-signup"]}>
        <h1>회원가입</h1>
        <label htmlFor="signupemail">이메일</label>
        {enteredEmail.length > 0 && (
          <span
            className={`${classes["email-message"]} ${
              emailValidation ? classes.success : classes.error
            }`}
          >
            {emailMessage}
          </span>
        )}
        <input id="signupemail" type="email" onChange={emailChangeHandler} />
        <label htmlFor="signupPassword">패스워드</label>
        {enteredPassword.length > 0 && (
          <span
            className={`${classes["password-message"]} ${
              passwordValidation ? classes.success : classes.error
            }`}
          >
            {passwordMessage}
          </span>
        )}
        <input
          id="signupPassword"
          type="password"
          onChange={passwordChangeHandler}
        />
        <button
          onClick={signUpHandler}
          disabled={!(emailValidation && passwordValidation)}
          className={
            !(emailValidation && passwordValidation)
              ? classes["button-disabled"]
              : ""
          }
        >
          회원가입
        </button>
        <button onClick={backLoginHandler}>로그인페이지 돌아가기</button>
      </form>
    </>
  );
};

export default SignUpForm;
