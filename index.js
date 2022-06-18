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

const db = mysql.createConnection({

    host: 'symbiotdb.mysql.database.azure.com',
    user: 'symbiot',
    password: 'QwertyQwerty@123',
    database: 'car_service',
    // port: process.env.PORT || 5000,
        ssl: {rejectUnauthorized:false}


})
db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('connected');
    }
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
    db.query(sql, function(err, results){
        if(err){
            console.log(err);
          
        }
        res.json(results);
        console.log(results);

    });
}
app.post('/services',(req,res)=>{
    //res.sendStatus(200);
    var n=req.body;
    var name=n.name;
    var salary=n.salary;
    var age=n.age;
    var sql=`INSERT INTO demo(name, salary, age)VALUES('${name}', '${salary}', '${age}');`;
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            console.log(results);
            res.send(results);
        }
        
    })
})

app.get("/services2",(req,res)=>{
    const id=req.query.adminid;
    console.log(id);
    const query=`SELECT * FROM services where admin_id=${id};`
    db.query(query,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }
        console.log('connected');
      
        console.log(results);
        res.send(results);
        console.log(typeof results);
    })
})

app.post('/booking',(req,res)=>{
    //res.sendStatus(200);
    var data=req.body;
    console.log(data);
    var admin_id=data.admin_id;
    var service_id=data.service_id;
    var user_id=data.user_id;
    var date_available=data.date;
    var time_slot=data.time;
    var sql=`INSERT INTO bookings(admin_id,service_id,user_id,date_available,time_slot,booking_status)VALUES('${admin_id}', '${service_id}','${user_id}' ,'${date_available}','${time_slot}','"BOOKED"');`;
   
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            console.log(results);
            res.send(results);
        }
        
    })
})








const p=(3001);
app.listen(p , (err) => {

    if(err){
        console.log(err);
    }
    console.log('running');
})

