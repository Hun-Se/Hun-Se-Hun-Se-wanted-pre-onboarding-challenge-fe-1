import DtailTodoItems from "./DtailTodoItems";
import Modal from "../../Modal/Modal";
import TodoModel from "../../../models/todo";
import classes from "./DtailTodo.module.css";

interface DtailTodoProps {
  header: HeadersInit;
  getTodo: TodoModel[];
  onClose: () => void;
}

const DtailTodo = (props: DtailTodoProps) => {
  return (
    <>
      <Modal onClose={props.onClose}>
        <>
          <div>
            {props.getTodo.map((item) => (
              <DtailTodoItems
                key={item.id}
                title={item.title}
                content={item.content}
                onClose={props.onClose}
              ></DtailTodoItems>
            ))}
          </div>
        </>
      </Modal>
    </>
  );
};

export default DtailTodo;
