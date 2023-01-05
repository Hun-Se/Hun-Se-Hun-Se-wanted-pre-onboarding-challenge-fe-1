import { Dispatch, SetStateAction } from "react";
import SignUpForm from "./SignUpForm";
import classes from "./SignUp.module.css";

interface signUpProps {
  renderLogin: Dispatch<SetStateAction<boolean>>;
}

const SignUp = (props: signUpProps) => {
  return (
    <>
      <div className={classes["container-signup"]}>
        <SignUpForm renderLogin={props.renderLogin} />
      </div>
    </>
  );
};

export default SignUp;
