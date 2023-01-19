import React, { useState, Dispatch, SetStateAction } from "react";
import useAuthChangeHanler from "../../hook/auth/useAuthChangeHanler";
import classes from "./SignUpForm.module.css";

interface signUpProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = (props: signUpProps) => {
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

  const signUpHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // try {
    //   const data = {
    //     email: enteredEmail,
    //     password: enteredPassword,
    //   };

    //   const res = await fetch("http://localhost:8080/users/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       if (res.message) alert(res.message);
    //       if (res.details) alert(res.details);
    //       backLoginHandler(event);
    //     });
    // } catch (e) {
    //   console.error(e);
    // }
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
              : classes["button-abled"]
          }
        >
          회원가입
        </button>
        <button className={classes["button-abled"]} onClick={backLoginHandler}>
          로그인페이지 돌아가기
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
