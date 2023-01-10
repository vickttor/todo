import { ChangeEvent, Dispatch, useState } from "react";
import { Badge } from "../Badge";
import { Todo } from "../../types/todo";
import { Trash } from "phosphor-react";

import styles from "./styles.module.css";
import todoListSvg from "../../assets/todoList.svg";
import { Checkbox } from "../Checkbox";

interface TodoListProps {
  todoList: Todo[];
  onToggle: (toggledTodoId: string, isChecked: boolean) => void;
  onDelete: (deletedTodoID: string) => void;
}

export function TodoList({
  todoList,
  onToggle: handleToggle,
  onDelete,
}: TodoListProps) {
  const todoAmount = todoList.length;
  const completedTodosAmount = todoList.filter(
    (todo) => todo.isCompleted
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <strong>
          Tarefas criadas <Badge>{todoAmount}</Badge>
        </strong>
        <strong>
          Concluídas{" "}
          <Badge>
            {completedTodosAmount} de {todoAmount}
          </Badge>
        </strong>
      </div>

      {todoList.length === 0 ? (
        <div className={styles.message}>
          <img src={todoListSvg} alt="Todo List" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      ) : (
        todoList.map((todo) => {
          return (
            <div key={todo.id} id={todo.id} className={styles.todoContainer}>
              <div className={styles.todoContent}>
                <Checkbox
                  checked={todo.isCompleted}
                  onToggle={(isChecked) => {
                    handleToggle(todo.id, isChecked);
                  }}
                />
                <label className={styles.label}>{todo.label}</label>
              </div>

              <button
                className={styles.deleteButton}
                onClick={() => {
                  onDelete(todo.id);
                }}
              >
                <Trash size={16} />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
