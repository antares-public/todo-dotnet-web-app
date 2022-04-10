import React, { useEffect, useState } from "react";
import { ITodo } from "./../interfaces";
import { ToDoForm } from "./../components/TodoForm";
import { TodoList } from "./../components/TodoList";
import { useHttp } from "../hook/http.hook";
import { catchDeleteTaskHandler } from "../lib/catch";

declare var confirm: (question: string) => boolean;

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState('')
  const { request } = useHttp()

  const addHandler = (title: string) => {
    if (title) {
      request('tasks', 'POST', {
        title,
        completed: false,
      }).then((todo) => setTodos((prev) => [todo, ...prev]))
    }
  };

  const toggleHandler = (id: number) => {
    const task = todos.find((task) => task._id === id)
    request(`tasks/${id}`, 'PUT', {
      title: task!.title,
      completed: !task!.completed,
    }).then(() => setTodos((prev) =>
      prev.map((todo) => {
        if (todo._id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    ))
  };

  const removeHandler = (id: number) => {
    const shouldRemove = confirm("Are you sure you want to remove?");
    if (shouldRemove) {
      const task = todos.find((e) => e._id === id)
      setTodos((prev) => prev.filter((t) => t !== task))
      request(`tasks/${id}`, 'DELETE').catch(() => catchDeleteTaskHandler({
        task: task!,
        updateTodos: setTodos,
        updateError: setError
      }))
    }
  };

  useEffect(() => {
    request('tasks').then((tasks) => setTodos(tasks));
  }, [])

  return (
    <>
      <ToDoForm onAdd={addHandler} />

      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />

      {error && <p>{error}</p>}
    </>
  );
};
