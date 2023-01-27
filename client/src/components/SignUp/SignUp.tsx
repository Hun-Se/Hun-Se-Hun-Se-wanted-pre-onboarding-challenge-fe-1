import SignUpForm from "./SignUpForm";
import classes from "./SignUp.module.css";

const SignUp = () => {
  return (
    <>
      <div className={classes["container-signup"]}>
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
