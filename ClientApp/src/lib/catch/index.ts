import { ITodo } from "../../interfaces"

type DeleteHandler = {
  task: ITodo, 
  updateTodos: (val: (prev: ITodo[]) => ITodo[]) => void, 
  updateError: (val: string) => void
}

export const catchDeleteTaskHandler = ({task, updateTodos, updateError}: DeleteHandler) => {
  updateTodos((prev: ITodo[]) => [task, ...prev])
  updateError('Error when deleting a task')
  }
