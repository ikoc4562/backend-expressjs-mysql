const mysql=require('mysql2');
var mysqlConnection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'testdb'
})

mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in DB'+JSON.stringify(err, undefined,2))
    } else {
        console.log('Connected success')
    }
})

module.exports=mysqlConnection
