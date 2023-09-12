const express = require('express');
const Controller = require('./controllers/controller');
const app = express();
const port = process.env.PORT || 4001; 

app.use(express.json());


app.get('/users', Controller.findAll);
app.get('/users/:id', Controller.findById);
app.post("/register", Controller.register);
app.delete("/users/:id", Controller.delete);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
