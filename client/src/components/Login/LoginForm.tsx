import React, { useState, Dispatch, SetStateAction } from "react";
import useAuthChangeHanler from "../../hook/auth/useAuthChangeHanler";
import classes from "./LoginForm.module.css";

interface loginFromProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = (props: loginFromProps) => {
  const {
    emailMessage,
    passwordMessage,
    emailValidation,
    passwordValidation,
    enteredEmail,
    enteredPassword,
    emailChangeHandler,
    passwordChangeHandler,
  } = useAuthChangeHanler();

  //   fetch("http://localhost:8080/users/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.message === "성공적으로 로그인 했습니다") {
  //         localStorage.setItem("access-token", res.token);
  //         navigate("/todo");
  //       }
  //     });
  // };

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
          disabled={!(emailValidation && passwordValidation)}
          className={
            !(emailValidation && passwordValidation)
              ? classes["button-disabled"]
              : classes["button-abled"]
          }
        >
          로그인
        </button>
        <button className={classes["button-abled"]} onClick={moveSignUpHandler}>
          회원가입
        </button>
      </form>
    </>
  );
};

export default LoginForm;
