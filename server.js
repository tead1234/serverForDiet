const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
// parser
app.use(express.urlencoded({extends: true}))
var db;
MongoClient.connect(
    'mongodb+srv://tead1234:4NnnFq4ERhd09WO8@clusterforlearn.cjxn4ww.mongodb.net/dbfortest?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    (error, client)=>{
       if(error) console.log(error)
    db = client.db('dbfortest');
    
    db.collection('post').insertOne(
        {
            이름: 'john',
            _id : 'jone'
        },
        (error, res)=>{
            console.log(error);
        }
    )

    app.listen(8080, function() {
        console.log('listening on 8080')
    });
});
app.get('/write', (request, res)=>{
    res.sendFile(__dirname+'/html/write.html')
})
//
app.post('/add', (req,res)=>{
    res.send('전송성공')
    console.log(req.body.title)
})