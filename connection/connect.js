var sql=require('mssql');
var connect=function(){
    var conn=new sql.ConnectionPool({
        
        user:'Vishwa',
        password:'Attra@123',
        server:'ATLT706\\SQLEXPRESS01',
        database:'DashboardDB',
        
        
    })
    return conn;
}
module.exports=connect