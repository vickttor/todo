import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types/todo";

import styles from "./App.module.css";

export function App() {
  const [todoList, setTodoList] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") ?? "[]") ?? []
  );
  const [newTodoText, setNewTodoText] = useState("");

  function handleLocalStorage(updatedTodoList: Todo[]) {
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();

    const newTodo = {
      id: uuidv4(),
      label: newTodoText,
      isCompleted: false,
      createdAt: new Date(),
    };

    setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);

    handleLocalStorage([newTodo, ...todoList]);

    setNewTodoText("");
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTodoText(event.target.value);
  }

  function handleInvalidTodo(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function handleToogle(toggledTodoID: string, isChecked: boolean) {
    setTodoList((prevTodoList) => {
      const updatedTodoList = prevTodoList.map((todo) => {
        if (todo.id === toggledTodoID) {
          return { ...todo, isCompleted: isChecked };
        }

        return todo;
      });

      handleLocalStorage(updatedTodoList);

      return updatedTodoList;
    });
  }

  function handleDeletedTodo(deletedTodoId: string) {
    setTodoList((prevTodoList) => {
      const updatedTodoList = prevTodoList.filter(
        (todo) => todo.id !== deletedTodoId
      );

      handleLocalStorage(updatedTodoList);

      return updatedTodoList;
    });
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleCreateNewTodo}>
          <input
            id="todo"
            name="todo"
            type="text"
            value={newTodoText}
            className={styles.newTodoInputText}
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTodoChange}
            onInvalid={handleInvalidTodo}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Criar <PlusCircle size={16} />
          </button>
        </form>

        <TodoList
          todoList={todoList}
          onToggle={handleToogle}
          onDelete={handleDeletedTodo}
        />
      </main>
    </>
  );
}
