const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://admin-abhi:admin-123@cluster0-csrvv.mongodb.net/todoDB", { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log("connected to the db"))

app = express();
app.use(bodyParser.urlencoded({ 'extended': true }))

app.set('view engine', "ejs");


const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
})


//collection 
let Todo = mongoose.model("Todo", todoSchema);



let todo = [
    "buy fruit",
    "read book",
    "sdaasa"
]

app.get('/', (req, res) => {
    res.render('index', { todoes: todo })
})


app.post('/', async (req, res) => {
    let item = await Todo.create(req.body)
    console.log(item)

    todo.push(req.body.item);
    res.redirect('/')
})

app.listen(3000, () => console.log('app is running at 3000.'));

