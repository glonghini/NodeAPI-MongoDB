const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/', (req, res) => {
    res.json({message: 'oi express!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
.connect(
`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apinode.u6eau.mongodb.net/testedb?retryWrites=true&w=majority`
)
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))

// glonghini
// zsAx9gCzJ8detu5

// mongodb+srv://glonghini:zsAx9gCzJ8detu5@apinode.u6eau.mongodb.net/testedb?retryWrites=true&w=majority
