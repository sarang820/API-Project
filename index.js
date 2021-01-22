const bodyParser = require("body-parser");
const express=require("express");
const mysql=require('mysql');
require("dotenv/config")
const app=express();
var db= require('./db')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
// console.log(process.env.DB_NAME);
//create connection
// const db=mysql.createConnection({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.DB_NAME,
//     port:process.env.DB_PORT
// });
//connect
// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log("Mysql connected");
// });

//Creating a table in db
// db.query('CREATE TABLE testdb (id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY,thing VARCHAR(255) NOT NULL)',(err,rows)=>{
//     if(err) throw err;
//     console.log("data sent");
//     console.log(rows);
// })

//Making entry in table
app.post('/addItem',(req,res)=>{
    let ID=req.body.id;
    let THING=req.body.thing;
db.query(`INSERT INTO testdb (id,thing) VALUES('${ID}','${THING}')`,(err,rows)=>{
    if(err) throw err;
   res.send("New item listed successfully");
    // res.send(THING);
})
});

// //Getting all the data
app.get('/getAllItems',(req,res)=>{
    let sql='SELECT * FROM testdb ';
    db.query(sql,(err,rows)=>{
        if(err) throw err;
        res.send(rows);
        console.log("All the data recieved successfully");
    });
});

// //Getting the data by id
app.get('/getById:id',(req,res)=>{
    let sql='SELECT * FROM testdb  WHERE id=?';
    db.query(sql,req.params.id,(err,row)=>{
        if(err) throw err;
        res.send(row);
        console.log("The data by id is recieved succesfully");
    });
});

// //Update by id
app.put("/updateById",(req,res)=>{
    var id=req.body.id;
    var thing=req.body.thing;
    db.query("Update testdb  SET thing=? WHERE id=?",[thing,id],(err,row)=>{
        if(err) throw err;
        res.send("Updated successfully");
    })
})

// //delete by id
app.delete("/deleteById:id",(req,res)=>{
    db.query("DELETE from testdb  WHERE id=?",req.params.id,(err,row)=>{
        if(err) throw err;
        res.send("Deleted successfully");
    })
})



const PORT =process.env.PORT || 6000;

app.listen(PORT,async()=>{console.log(`Server Started@${PORT}`)});