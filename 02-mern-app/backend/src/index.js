import todos from './routers/todos.js';
import { connectToMongo } from './mongo/config.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT) || 8080;

connectToMongo().then(
  () => console.log('Connected to mongodb!'),
  (err) => console.error('Could not connect to mongodb!', err)
);

app.use(cors());
app.use(express.json());

app.use('/todo', todos);

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
