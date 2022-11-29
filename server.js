const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
// parser
app.use(express.urlencoded({extends: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var db;
MongoClient.connect(
    'mongodb+srv://tead1234:4NnnFq4ERhd09WO8@clusterforlearn.cjxn4ww.mongodb.net/dbfortest?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    (error, client)=>{
    if(error) console.log(error)
    
    db = client.db('dbfortest');

    app.listen(8080, function() {
        console.log('listening on 8080')
    });
});
app.get('/write', (request, res)=>{
    res.sendFile(__dirname+'/html/write.html')
})
app.get('/list', (req,res)=>{
    db.collection('post').find().toArray((error, res2)=>{
        console.log(res2);
        res.render('list.ejs', {posts : res2})

    })
    // ejs파일로 res를 보내기 위해 작명이 필요

    // res.sendFile(__dirname+'/html/list.html');
});
// post요청에선 req안에 사용자가 담은 정보가 있음
app.post('/add', (req,res)=>{
    // res.send('전송성공')
    // console.log(req.body.title)
    db.collection('counter').findOne({name: '사물갯수'}, (error, res) => {
        
        // totalpost 바뀐 값을 다시 db로 보내야돼
        db.collection('counter').updateOne(
            // 수정할 데이터, 수정한 값, 콜백
            {name : '사물갯수'},
            { // operator
                $inc : {
                    totalPost : 1
            },()=>{
                var totalPost =res.totalpost;
                db.collection('post').insertOne(
            {
                _id : totalPost,
                이름: req.body.title,
                날짜: req.body.date
            },
            (error, res)=>{
                console.log("post error"+ error);  
            }
        
    );


            })
        
})
        

// DELETE 
app.delete('/delete',(req, res)=>{
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body._id, (err, res)=>{
        console.log('complete');
    })
    res.send('complete');
})

//
