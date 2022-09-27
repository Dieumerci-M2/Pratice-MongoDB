const {MongoClient} = require('mongodb')

let dbConnexion;
module.exports = {
    connectToDb: (callback)=>{
        MongoClient.connect('mongodb://localhost:27017/bookstore')
        .then((client)=>{
            dbConnexion = client.db()
            return callback()
        }).catch(err => {
            console.log(err);
            return callback(err)
        })
    },
    getDb: ()=> dbConnexion 
}