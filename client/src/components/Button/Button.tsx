import classes from "./Button.module.css";

interface Props {
  name: string;
  text: string;
  onLogOut: () => void;
}

const Button = (props: Props) => {
  return (
    <button className={classes[props.name]} onClick={props.onLogOut}>
      {props.text}
    </button>
  );
};

export default Button;
