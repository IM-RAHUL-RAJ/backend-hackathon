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
        ssl: {rejectUnauthorized:false},
    multipleStatements: true


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
app.get('/admins',(req,res)=>{
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
      
        console.log(results[0].service_id);
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

app.post('/createuser',(req,res)=>{
    //res.sendStatus(200);
    var data=req.body;
    console.log(data);
    // var user_id=data.user_id;
    var user_name=data.user_name;
    var user_email=data.user_email;
    var user_password=data.user_password;
    var user_phoneno=data.user_phoneno;
    var sql=`INSERT INTO users(user_name,user_email,user_password,user_phoneno)VALUES('${user_name}', '${user_email}','${user_password}' ,'${user_phoneno}');`
    // SELECT user_id from users;`;
   
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

app.get('/currentuserid',(req,res)=>{
    // const id=req.query.adminid;
    // console.log(id);
    const query=`SELECT user_id from users WHERE user_id=(SELECT max(user_id) from users);`;
    db.query(query,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }
        console.log('connected');
        // const myJSON = JSON.stringify(results);

        // console.log(typeof results);
        // res.send(myJSON);
        console.log(results[0].user_id);
        res.send(results);
        // console.log();
    })
})



app.get('/getallbookings',(req,res)=>{
    const id=req.query.userid;
    console.log(id);
    const query=`  SELECT b.user_id,b.booking_id,s.service_type,b.admin_id,b.date_available,b.time_slot FROM bookings b INNER JOIN services s ON b.service_id=s.service_id AND b.user_id=${id};`;
    db.query(query,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }
        console.log('connected');
        // const myJSON = JSON.stringify(results);

        // console.log(typeof results);
        // res.send(myJSON);
        console.log(results);
        res.send(results);
        // console.log();
    })
})


app.post('/createadmin',(req,res)=>{
    //res.sendStatus(200);
    var data=req.body;
    console.log(data);
    // var user_id=data.user_id;
    var title=data.title;
    var name=data.name;
    var email=data.email;
    var password=data.password;
    var phone_number=data.phone_number;
    var latitude=data.latitude;
    var longitude=data.longitude;
    var description=data.description;
    var sql=`INSERT INTO admins(title,name,email,password,phone_number,latitude,longitude,description) VALUES('${title}', '${name}','${email}' ,'${password}','${phone_number}','${latitude}','${longitude}','${description}');`;
   
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

