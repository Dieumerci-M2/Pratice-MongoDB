const expess = require('express')
const {connectToDb, getDb} = require('./db')

// init app & middleware

const app = expess()

app.listen(3000, ()=>{
    console.log(`app is lestening by port 3000 and you can get it on: http://localhost:${3000}`)
})

// Routres

app.get('/books',(req, res)=>{
        res.json({mssg:'welcome to our API'})
        
})
app.get('/',(req,res)=>{
    res.send('hello Mongo 🖐️')
})