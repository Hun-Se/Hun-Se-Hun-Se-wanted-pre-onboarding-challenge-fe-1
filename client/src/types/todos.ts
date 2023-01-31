export interface TodoType {
  title: string;
  content: string;
  id: string;
  createdTodos: string;
  updatedTodos: string;
}

export type TodoFormType = Pick<TodoType, "title" | "content">;

export type CreateTodoType = TodoFormType;

export type UpdateTodoType = Pick<TodoType, "id" | "title" | "content">;

export type DeleteTodoType = Pick<TodoType, "id" | "title" | "content">;

export interface ShownModalHandlerType {
  onShown: () => void;
}

export interface HideModalHandlerType {
  onHide: () => void;
}
