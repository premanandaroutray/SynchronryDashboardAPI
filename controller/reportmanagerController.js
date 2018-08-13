var express=require('express');
var router=express.Router();
var sql=require('mssql');
var conn=require('../connection/connect')();

//Dispaly all Task
var routes=function(){
router.route('/')
    .get(function(req,res){
        conn.connect().then(function(){
                var request=new sql.Request(conn);
                request.execute("sp_ManagerDetails").then(function(recordSet){
                conn.close();
                res.status(200).send(recordSet.recordset);
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while fetching the data from the table");
                    console.error(err)
                });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Error occured while fetching the data from the table");
            console.error(err)
        });   
    });
    return router;
}

module.exports=routes;