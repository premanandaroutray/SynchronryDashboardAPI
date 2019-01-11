var sql=require('mssql');
var connect=function(){
    var conn=new sql.ConnectionPool({
        
        user:'sa1234',
    
        password:'sa@12345',
        server:'ATLT979\\SQLEXPRESS',
        database:'DashboardDB',
        port:'1433'
        
    })
    return conn;
}
module.exports=connect