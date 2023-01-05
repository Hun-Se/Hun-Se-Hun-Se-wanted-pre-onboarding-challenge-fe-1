import React, { useState, Dispatch, SetStateAction } from "react";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";

interface loginFromProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = (props: loginFromProps) => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const navigate = useNavigate();

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setEnteredPassword(event.target.value);
  };

  const onLoginHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    const data = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const res = fetch("http://localhost:8080/users/login", {
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
        <label htmlFor="loginemail">이메일</label>
        <input id="loginemail" type="email" onChange={emailChangeHandler} />
        <label htmlFor="loginpassword">패스워드</label>
        <input
          id="loginpassword"
          type="text"
          onChange={passwordChangeHandler}
        />
        <button onClick={onLoginHandler}>로그인</button>
        <button onClick={moveSignUpHandler}>회원가입</button>
      </form>
    </>
  );
};

export default LoginForm;
