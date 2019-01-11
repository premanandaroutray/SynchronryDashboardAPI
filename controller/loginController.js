var express=require('express');
var jwt=require('jsonwebtoken');
var router=express.Router();
var sql=require('mssql');
var conn=require('../connection/connect')();

var routes=function(){

    router.route('/:uid/:pwd')
    .get((req,res)=>{
      


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
                res.status(400).send(js);
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Connection error");
            console.error(err)
        });   
    });

    router.route('/jwt')
    .post((req,res)=>{
        console.log(req.body);
        var _userId=req.body.userid;
        var _pwd=req.body.password;
        conn.connect().then(function(){
          
        
                var request=new sql.Request(conn);
               
                request.input("UserCode", sql.VarChar(50), _userId)
                request.input("Password", sql.VarChar(50), _pwd)
                
                request.execute("sp_GetUserLoginDetails").then(function(recordSet){
                if( recordSet.recordset.length>0)
                {
                    //console.log(recordSet.recordset);
                    // var user=recordSet.recordset;
                    var payload=recordSet.recordset;
                     jwt.sign({payload},'secretkey',{expiresIn:'300s'},(err,token)=>{
                         if(err)
                         {
                           return  res.status(403).json(err);
                             //console.log(err);
                         }
                         
                         else
                         {
                            //console.log(res.json(recordSet.recordset) + token +' mdd')
                            //res.status(200).send(req.body);
                        return res.status(200).json({token});
                         
                         }
                     });
                   
                
                }
                else{
                    res.sendStatus(404) 
                   
                }
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
    
    //return req.token;
   
   
//return verifytoken;
}
module.exports=routes;
