import Todo from '../mongo/Todo.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  Todo.find().then((todos) => {
      res.send(
        todos.map((todo) => ({
          id: todo._id,
          title: todo.title,
          completed: todo.completed
        }))
      );
    },
    () => {
      res.send([]);
    });
});

router.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.send('Bad Request');
  } else {
    Todo.findById(req.params.id).then((todo) => {
      if (todo) {
        res.send({
          id: todo._id,
          title: todo.title,
          completed: todo.completed
        });
      } else {
        res.status(404);
        res.send('Not Found');
      }
    })
  }
});

router.post('/', (req, res) => {
  if (!req.body?.title) {
    res.status(400);
    res.send('Bad Request');
  }
  try {
    Todo.create({
      title: req.body.title,
      completed: false
    }).then((todo) => {
      res.status(201);
      res.send(todo);
    });
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send();
  }
});

router.patch('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.send('Bad Request');
  } else {
    Todo.findById(req.params.id).then((todo) => {
      if (todo) {
        Todo.updateOne(
          { _id: todo._id },
          {
            title: req.body?.title ?? todo.title,
            completed: req.body?.completed ?? todo.completed,
          },
        ).then(() => {
          res.status(200);
          res.send();
        }).catch((err) => {
          if (err.name === 'CastError') {
            res.status(400);
          } else {
            res.status(500);
          }
          res.send();
        });

      } else {
        res.status(404);
        res.send('Not Found');
      }
    })
  }
});

router.delete('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.send('Bad Request');
  } else {
    Todo.findById(req.params.id).then((todo) => {
      if (todo) {
        Todo.deleteOne({ _id: todo._id }).then(() => {
          res.status(204);
          res.send();
        });
      } else {
        res.status(404);
        res.send('Not Found');
      }
    })
  }
});

export default router;
