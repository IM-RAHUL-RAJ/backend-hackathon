const express = require('express')
const app=express()
const mysql = require('mysql')
const cors=require('cors')
var bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.get('/', function(req, res){
//     res.send('hello');
//     var connection = mysql.createConnection({
//         host: 'symbiotdb.mysql.database.azure.com',
//         user: 'symbiot',
//         password: 'QwertyQwerty@123',
//         database: 'car_service',
//         port:3306,
//         ssl: {rejectUnauthorized:false}
//       })

const db = mysql.createPool({

    host: 'symbiotdb.mysql.database.azure.com',
    user: 'symbiot',
    password: 'QwertyQwerty@123',
    database: 'car_service',
    // port: process.env.PORT || 5000,
        ssl: {rejectUnauthorized:false}


})
app.use(cors()) 
app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/public/index.html');
})
app.get('/users',(req,res)=>{
    const query='SELECT * FROM admins'
    db.query(query,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }
        console.log('connected');
        res.send(results);
        console.log(typeof results);
    })
})

      
// connection.connect(function(err) {
//     if (err) throw err
//     console.log('You are now connected...')
//   })
// app.get('/services',(req,res)=>{
//     res.send('services page');
// })

function queryExecute(sql,res){
    db.query(sql,function(err,results){
        if(err){
            console.log("error");
          
        }
        res.json(results);
        // console.log(results);

    });
}
app.post('/services',(req,res)=>{
    // res.sendStatus(200);
    const n=req.body;
    console.log(Object.keys(n).length);
    console.log(n.length);
    console.log(n);
    const id=n.id;
    const name=n.name;
    const salary=n.salary;
    const age=n.age;
    let sql=`INSERT INTO demo(name,salary,age) VALUES ('${name}', '${salary}', '${age}');`
    queryExecute(sql,res);
})




const p=(3001);
app.listen(p , (err) => {

    if(err){
        console.log(err);
    }
    console.log('running');
})