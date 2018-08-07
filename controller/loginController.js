var express=require('express');
var router=express.Router();
var sql=require('mssql');
var conn=require('../connection/connect')();

var routes=function(){

    router.route('/:uid/:pwd')
    .get(function(req,res){
        var _userId=req.params.uid;
        var _pwd=req.params.pwd;
        conn.connect().then(function(){
          
        
                var request=new sql.Request(conn);
               
                request.input("UserCode", sql.VarChar(50), _userId)
                request.input("Password", sql.VarChar(50), _pwd)
                
                request.execute("sp_GetUserLoginDetails").then(function(recordSet){
                
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