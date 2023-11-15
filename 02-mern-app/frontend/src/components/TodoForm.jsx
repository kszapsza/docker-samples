import { useState } from 'react';
import axios from 'axios';

export function TodoForm({ reload }) {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState(false);

  function createTodo() {
    if (newTodoTitle.trim().length === 0) {
      return;
    }
    setError(false);
    axios.post('/todo', {
      title: newTodoTitle.trim(),
    }).then(() => {
      reload();
    }).catch(() => {
      setError(true);
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '.25rem' }}>
      {error && (
        <p style={{ color: 'red' }}>
          Could not create a new to-do item!
        </p>
      )}
      <input
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value || '')}
      />
      <button onClick={createTodo}>
        Create!
      </button>
    </div>
  );
}
