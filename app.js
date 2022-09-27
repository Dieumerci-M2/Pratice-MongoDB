const { ObjectID } = require('bson');
const expess = require('express')
const {connectToDb, getDb} = require('./db')

// init app & middleware

const app = expess()
app.use(expess.json())

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

// Routes
// Racine route 

app.get('/',(req,res)=>{
    res.send('hello Mongo 🖐️')
})

// Data Base route

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

// Show One Element on my DB by passing his Id on parameter

app.get('/books/:id', (req, res)=>{
    if(ObjectID.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: ObjectID(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch((err)=>{
            res.status(500).json({error: `Server could not respond`})
        })
    }
    else{
        res.status(500).json({error: `Not a valid Id`})
    }
})

// Post Endepoint 

app.post('/books', (req, res)=>{

    const book = req.body
    
    db.collection('books')
    .insertOne(book)
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({err: `Can't add a element in DB`})
    })
})

// Delete Endpoint

app.delete('/books/:id', (req, res)=>{
    if(ObjectID.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: ObjectID(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).json({error: `Could not delete element`})
        })
    }
    else{
        res.status(500).json({error: `Not a valid Id`})
    }
})
