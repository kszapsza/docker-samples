import mongoose from 'mongoose';

const Todo = mongoose.model('Todo', {
  title: String,
  completed: Boolean
});

export default Todo;
