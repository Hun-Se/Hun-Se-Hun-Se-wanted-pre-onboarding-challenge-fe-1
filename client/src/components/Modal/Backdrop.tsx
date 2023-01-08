import classes from "./Backdrop.module.css";

interface BackdropProps {
  onClose: () => void;
}

const Backdrop = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

export default Backdrop;
