var express=require('express');
var router=express.Router();
var sql=require('mssql');
var conn=require('../connection/connect')();

var routes=function(){
    router.route('/')
    .get(function(req,res){
        conn.connect().then(function(){
                var request=new sql.Request(conn);
                request.execute("sp_getAllUsers").then(function(recordSet){
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
   
    router.route('/')
    .post(function(req,res){
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("UserCode", sql.VarChar(50), req.body.UserCode)
                request.input("UserName", sql.VarChar(50), req.body.UserName)
                request.input("Password", sql.VarChar(100), req.body.Password)
                request.input("RoleID",sql.Int, req.body.RoleID)
                request.execute("sp_InsertUser").then(function(){
                transaction.commit().then(function(recordSet){
                conn.close();
                res.status(200).send(req.body);

                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while Inserting data into the table");
                    console.error(err)
                });
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while Inserting data into the table");
                    console.error(err)
                })
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error occured while Inserting data into the table");
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Error occured while Inserting data into the table");
            console.error(err)
        });   
    });

    router.route('/:id')
    .put(function(req,res){
        var _userId=req.params.id;
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("ID", sql.Int, _userId)
                request.input("UserCode", sql.VarChar(50), req.body.UserCode)
                request.input("UserName", sql.VarChar(50), req.body.UserName)
                request.input("Password", sql.VarChar(100), req.body.Password)
                request.input("RoleID",sql.Int, req.body.RoleID)
                request.execute("sp_UpdateUser").then(function(){
                transaction.commit().then(function(recordSet){
                conn.close();
                res.status(200).send(req.body);

                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while Updating data in the table");
                    console.error(err)
                });
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while updating data in the table");
                    console.error(err)
                })
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error occured while updating data in the table");
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Error occured while Inserting data into the table");
            console.error(err)
        });   
    });
    
    //Delete

    router.route('/:id')
    .delete(function(req,res){
        var _userId=req.params.id;
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("ID", sql.Int, _userId)
                request.execute("sp_DeleteUser").then(function(){
                transaction.commit().then(function(recordSet){
                conn.close();
                res.status(200).send(req.body);

                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while Inserting data into the table");
                    console.error(err)
                });
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while updating data into the table");
                    console.error(err)
                })
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error occured while Inserting data into the table");
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Error occured while Inserting data into the table");
            console.error(err)
        });   
    });
    return router;
}
module.exports=routes;