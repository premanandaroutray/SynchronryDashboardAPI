var express=require('express');
var router=express.Router();
var sql=require('mssql');
const jwt=require('jsonwebtoken');
var conn=require('../connection/connect')();
//var login=require('../controller/verifyJwtToken')();
var routes=function(){
    router.route('/:roleId')
 
    // .get((req,res)=>{
    //     var _roleId=req.params.roleId;
   
    //     // jwt.verify(req.token,'secretkey',(err,authData)=>{
    //     //     if(err)
    //     //     {
    //     //         console.log(authData);
    //     //        console.log(req.token) 
    //     //         res.sendStatus(403);
    //     //         console.log(err);
    //     //     }
    //     //     else{
               
    
    //     conn.connect().then(function(){
    //        // Console.log('RoleID='+_roleId);
        
    //             var request=new sql.Request(conn);
               
    //             request.input("RoleID", sql.Int, _roleId)
             
                
    //             request.execute("sp_GetMenusByRole").then(function(recordSet){
                
    //             res.json(recordSet.recordset);
    //             conn.close();
                
             
    //         })
    //         .catch(function(err){
    //             conn.close();
    //             res.status(400).send("Error occured while Fetching data from the table");
    //             console.error(err)
    //         });
    //     }) 
    //     .catch(function(err){
    //         conn.close();
    //         res.status(400).send("Connection error");
    //         console.error(err)
    //     });   
    //        // }
            
    //     });
        
    //});
    //
    router.route('/:roleId')
 
    .get(verifytoken,(req,res)=>{
        var _roleId=req.params.roleId;
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
            {
                console.log(authData);
               console.log(req.token) 
                res.sendStatus(403);
                console.log(err);
            }
            else{
               
    
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
            }
            
        });
        
    });
  
    return router;
    
}
function verifytoken (req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !=='undefined')
    {
       const  bearer=bearerHeader.split(' ');
       const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}
module.exports=routes;
