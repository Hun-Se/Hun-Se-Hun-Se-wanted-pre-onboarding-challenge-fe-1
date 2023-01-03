import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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
  const onSubmitHanlder = (event: React.FormEvent) => {
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

  return (
    <>
      <form onSubmit={onSubmitHanlder}>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" onChange={emailChangeHandler} />
        <label htmlFor="password">패스워드</label>
        <input id="password" type="text" onChange={passwordChangeHandler} />
        <button>로그인</button>
      </form>
    </>
  );
};

export default LoginForm;
