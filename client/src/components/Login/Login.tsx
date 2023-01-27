import LoginForm from "./LoginForm";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <>
      <div className={classes["container-login"]}>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
