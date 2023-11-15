import { useEffect, useState } from 'react';
import { Todo } from './Todo.jsx';
import axios from 'axios';
import { TodoForm } from './TodoForm.jsx';

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  function fetchTodos() {
    setLoading(true);
    axios.get('/todo')
      .then((todos) => {
        setTodos(todos.data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      <TodoForm reload={fetchTodos} />

      {error && (<p style={{ color: 'red' }}>Connection error!</p>)}
      {loading && (<p>Loading...</p>)}

      {!error && !loading && (!todos || todos.length === 0) && (
        <p>No todos!</p>
      )}
      {todos && todos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {todos.map((todo) => (<Todo key={todo.id} todo={todo} reload={fetchTodos}/>))}
        </div>
      )}
    </div>
  );
}
