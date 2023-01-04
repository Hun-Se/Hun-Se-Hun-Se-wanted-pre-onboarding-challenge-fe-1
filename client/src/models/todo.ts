class TodoModel {
  id: string;
  title: string;
  text: string;

  constructor(todoTitle: string, todoText: string) {
    this.title = todoTitle;
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default TodoModel;
