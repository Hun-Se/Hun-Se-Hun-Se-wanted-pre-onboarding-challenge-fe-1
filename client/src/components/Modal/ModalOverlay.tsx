import classes from "./ModalOverlay.module.css";

interface ModalProps {
  children: JSX.Element;
}

const ModalOverlay = (props: ModalProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default ModalOverlay;
