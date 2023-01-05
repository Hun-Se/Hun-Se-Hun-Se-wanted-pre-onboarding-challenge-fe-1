import { Dispatch, SetStateAction } from "react";
import LoginForm from "./LoginForm";
import classes from "./Login.module.css";

interface loginProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = (props: loginProps) => {
  return (
    <>
      <div className={classes["container-login"]}>
        <LoginForm renderLogin={props.renderLogin} />
      </div>
    </>
  );
};

export default Login;
