const expess = require('express')
const {connectToDb, getDb} = require('./db')

// init app & middleware

const app = expess()
// Data base connexion
let db;
let books = []
connectToDb ((err)=>{
    if(!err){
        app.listen(3000, ()=>{
            console.log(`app is lestening by port 3000 and you can get it on: http://localhost:${3000}`)
        })
        db = getDb();
    }
})

// Routres

app.get('/books',(req, res)=>{ 

    db.collection('books')
    .find()
    .sort({author: 1})
    .forEach(book => {
       books.push(book) 
    })
    .then(()=>{
        res.status(200).json(books)

    })
    .catch(()=>{
        res.status(500).json({error : `Server could not respond`})
    })
})
app.get('/',(req,res)=>{
    res.send('hello Mongo 🖐️')
})