import axios from 'axios';

export function Todo({ todo: { id, title, completed }, reload }) {
  function toggleCompleted(id, completed) {
    axios.patch(`/todo/${id}`, { completed: !completed }).then(reload);
  }

  function removeTodo(id) {
    axios.delete(`/todo/${id}`).then(reload);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '.5rem' }}>
      <span style={{ textDecoration: (completed ? 'line-through' : 'none') }}>{title}</span>
      <button onClick={() => toggleCompleted(id, completed)}>
        {completed ? "☑" : "☐"}
      </button>
      <button onClick={() => removeTodo(id)}>x</button>
    </div>
  );
}
