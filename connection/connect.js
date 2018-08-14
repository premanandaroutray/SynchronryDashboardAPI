var sql=require('mssql');
var connect=function(){
    var conn=new sql.ConnectionPool({
        
        user:'sa1234',
        password:'sa@12345',
        server:'ATLT954\\SQLEXPRESS',
        database:'DashboardDB',
        
        
    })
    return conn;
}
module.exports=connect