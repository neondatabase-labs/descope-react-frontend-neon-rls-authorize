import React, { useEffect, useState } from "react";
import { useUser, getSessionToken } from "@descope/react-sdk";
import { neon } from "@neondatabase/serverless";

const getDb = (token) =>
  neon(import.meta.env.VITE_DATABASE_AUTHENTICATED_URL, {
    authToken: token,
  });

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const session = getSessionToken();

  const fetchTodos = async (inputDb) => {
    let sql;

    if (!inputDb) {
      sql = await getDb(session);
    } else {
      sql = inputDb;
    }

    const rows =
      await sql`SELECT title, done FROM todos WHERE user_id = auth.user_id() ORDER BY done, created_at DESC`;
    setTodos(rows.map((row) => ({ text: row.title, completed: row.done })));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = formData.get("newTodo");
    if (newTodo.trim() !== "") {
      e.target.reset();
      const sql = await getDb(session);
      await sql`INSERT INTO todos (title, done, user_id) VALUES (${newTodo}, ${false}, auth.user_id())`;
      fetchTodos(sql);
    }
  };

  const deleteTodo = async (index) => {
    const sql = await getDb(session);
    await sql`DELETE FROM todos WHERE title = ${todos[index].text} AND user_id = auth.user_id()`;
    fetchTodos(sql);
  };

  const toggleTodo = async (index) => {
    const sql = await getDb(session);
    await sql`UPDATE todos SET done = ${!todos[index]
      .completed} WHERE title = ${
      todos[index].text
    } AND user_id = auth.user_id()`;
    fetchTodos(sql);
  };

  return (
    <div className="todo-app">
      <h2>Todos</h2>
      <form onSubmit={addTodo}>
        <input name="newTodo" type="text" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <p className={todo.completed ? "done" : "not-done"}>{todo.text}</p>
            <button onClick={() => deleteTodo(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
