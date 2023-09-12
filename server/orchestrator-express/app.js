const { default: axios } = require('axios');
const express = require('express');
const redis = require('./config/ioredis');
const app = express();
const port = process.env.PORT || 4000; 
const appUrl = "http://localhost:4002"
const userUrl = "http://localhost:4001"
const Controller = require('./controllers/controller')
app.use(express.json());
app.use(express.urlencoded({extended: false}));
 
app.get('/items', Controller.getItems);

app.get('/items/:id', Controller.getItemById)

app.delete('/items/:id', Controller.deleteItem);

app.put('/items/:id', Controller.updateItem);

app.post('/items', Controller.createItem);

app.get('/users', Controller.getUsers);

app.get('/users/:id', Controller.getUserById);

app.post('/users', Controller.createUser);

app.delete('/users/:id', Controller.deleteUser);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
