const express = require('express');
const bodyParser = require('body-parser');
const users = require('./data-base');

const app = express();
const port = 6500;

app.use(bodyParser.json());


//Rota GET para exibir todos os usuarios
app.get("/users", (req, res) => { 
    res.send(users)
})
//Rota POST para criar um novo usuario 
app.post("/users", (req, res) => { 
    const user = { id: req.body.id , name: req.body.name , email: req.body.email }
    users.push(user)
    res.send(users)
})
//Rota PUT para atulizar um usuario existente
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user.name = req.body.name;
    user.email = req.body.email;
    res.send(user)
})
//Rota DELETE para excluir um usuario existente
app.delete("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(users)
})

app.listen(port, () => {console.log("Servidor rodando na porta " + port)})