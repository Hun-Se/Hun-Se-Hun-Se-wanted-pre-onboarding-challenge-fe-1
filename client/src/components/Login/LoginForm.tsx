import useAuthChangeHanler from "../../hook/auth/useAuthChangeHanler";
import useLoginSubmitHandler from "../../hook/auth/useLoginSubmit";
import useNavigatePageHanlder from "../../hook/useNavigePageHanlder";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const {
    emailMessage,
    passwordMessage,
    emailValidation,
    passwordValidation,
    email,
    password,
    emailChangeHandler,
    passwordChangeHandler,
  } = useAuthChangeHanler();

  const { onLoginSubmit } = useLoginSubmitHandler();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });
    onLoginSubmit({ email, password });
  };

  const { navigateSignUpHandler } = useNavigatePageHanlder();

  return (
    <>
      <form className={classes["form-login"]} onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <label htmlFor="loginemail">이메일</label>
        {email.length > 0 && (
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
        {password.length > 0 && (
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
        <button
          className={classes["button-abled"]}
          onClick={navigateSignUpHandler}
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default LoginForm;
