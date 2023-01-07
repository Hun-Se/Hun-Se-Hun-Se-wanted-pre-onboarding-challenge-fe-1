import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";

interface loginFromProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = (props: loginFromProps) => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const navigate = useNavigate();

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

  const onLoginHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const data = {
      email: enteredEmail,
      password: enteredPassword,
    };

    fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "성공적으로 로그인 했습니다") {
          console.log(res);
          localStorage.setItem("access-token", res.token);
          navigate("/todo");
        }
      });
  };

  const moveSignUpHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    props.renderLogin(false);
  };

  return (
    <>
      <form className={classes["form-login"]}>
        <h1>로그인</h1>
        <label htmlFor="loginemail">이메일</label>
        {enteredEmail.length > 0 && (
          <span
            className={`${classes["email-message"]} ${
              emailValidation ? classes.success : classes.error
            }`}
          >
            {emailMessage}
          </span>
        )}
        <input id="loginemail" type="email" onChange={emailChangeHandler} />

        <label htmlFor="loginpassword">패스워드</label>
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
          id="loginpassword"
          type="password"
          onChange={passwordChangeHandler}
        />

        <button
          onClick={onLoginHandler}
          disabled={!(emailValidation && passwordValidation)}
          className={
            !(emailValidation && passwordValidation)
              ? classes["button-disabled"]
              : ""
          }
        >
          로그인
        </button>
        <button onClick={moveSignUpHandler}>회원가입</button>
      </form>
    </>
  );
};

export default LoginForm;
