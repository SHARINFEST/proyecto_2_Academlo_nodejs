const express = require('express');
const db = require('./utils/database');
const Todos = require('./models/user.model.js');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000; 

db.authenticate()  
.then(() => console.log('base de datos conectada'))
.catch((err) => console.log(err));

db.sync()  
  .then(()=> console.log('Base de datos sincronizada'))
  .catch(error => console.log(error));

const app = express();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Servidor Funcionando')
} );



app.post("/api/v1/todos", async (req, res) =>{
    try {
       
       const newHomework = req.body;
      
       await Todos.create(newHomework);
      
       res.status(201).send();
    } catch (error) {
        
        res.status(400).json(error);
    }
});


app.get('/api/v1/todos', async (req, res) =>{
    try{
 const todos = await Todos.findAll({
    attributes: ['title', 'description','completed']

 });
    res.json(todos);
     } catch (error){
        res.status(400).json(error)
     }
});




app.get('/api/v1/todos/:id', async (req, res) =>{
    try{
     
     const { id } = req.params;
     console.log(req.params);

    const todos = await Todos.findByPk(id);
    res.json(todos);

     } catch (error){
        res.status(400).json(error)
     }
});




app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Todos.destroy ({
            where: {id} 
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
        
    }
});



app.put('/api/v1/todos/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const { title, description, completed } = req.body;
    await Todos.update({title, description, completed}, {
        where: {id}
    });
    res.status(204).send();
   
  } catch (error) {
    res.status(400).json(error);
  }
});



app.listen(PORT, () => {
    console.log('servidor esuchando en el puerto 8000')
});


// console.log(process.env)c