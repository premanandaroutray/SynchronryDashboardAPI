var express=require('express');
var router=express.Router();
var sql=require('mssql');
var conn=require('../connection/connect')();

var routes=function(){

    router.route('/:roleId')
    .get(function(req,res){
        var _roleId=req.params.roleId;
    
        conn.connect().then(function(){
          
        
                var request=new sql.Request(conn);
               
                request.input("RoleID", sql.Int, _roleId)
             
                
                request.execute("sp_GetMenusByRole").then(function(recordSet){
                
                res.json(recordSet.recordset);
                conn.close();
                
             
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error occured while Fetching data from the table");
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Connection error");
            console.error(err)
        });   
    });
    return router;

}
module.exports=routes;