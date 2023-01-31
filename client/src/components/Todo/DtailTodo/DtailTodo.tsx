import DtailTodoItems from "./DtailTodoItems";
import Modal from "../../Modal/Modal";

interface DtailTodoProps {
  id: string;
  title: string;
  content: string;
  onHiden: () => void;
}

const DtailTodo = (props: DtailTodoProps) => {
  return (
    <>
      <Modal onClose={props.onHiden}>
        <>
          <div>
            <DtailTodoItems
              key={props.id}
              title={props.title}
              content={props.content}
              onHiden={props.onHiden}
            ></DtailTodoItems>
          </div>
        </>
      </Modal>
    </>
  );
};

export default DtailTodo;
