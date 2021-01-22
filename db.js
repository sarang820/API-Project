const utils=require('util')
const mysql= require('mysql')

let pool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    ssl:true,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

pool.getConnection((err,connection)=>{
    if(err){
        console.log(err);
    } else console.log("Mysql Connected");
    if(connection) connection.release();
    return;
});

pool.query=utils.promisify(pool.query);
module.exports=pool;