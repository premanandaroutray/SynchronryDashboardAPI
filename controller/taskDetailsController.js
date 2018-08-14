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
                request.execute("sp_getAllTaskDetails").then(function(recordSet){
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
        });   router.route('/')
        .get(function(req,res){
            conn.connect().then(function(){
                    var request=new sql.Request(conn);
                    request.execute("sp_getAllTaskDetails").then(function(recordSet){
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
     
    });
 

// Insert Task

    router.route('/')
    .post(function(req,res){
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("TaskName", sql.VarChar(100), req.body.TaskName)
                request.input("ProjectID", sql.Int, req.body.ProjectID)
                request.input("HoursSpend", sql.Decimal, req.body.HoursSpend)
                request.input("RoleID",sql.Int, req.body.RoleID)
                request.execute("sp_InsertTaskDetails").then(function(){
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

    //Update Task 
    router.route('/:id')
    .put(function(req,res){
        var _taskId=req.params.id;
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("TaskID", sql.Int, _taskId)
                request.input("TaskName", sql.VarChar(100), req.body.TaskName)
                request.input("ProjectID", sql.Int, req.body.ProjectID)
                request.input("HoursSpend", sql.Decimal, req.body.HoursSpend)
                request.input("RoleID",sql.Int, req.body.RoleID)
                request.execute("sp_UpdateTaskDetails").then(function(){
                transaction.commit().then(function(recordSet){
                conn.close();
                res.status(200).send(req.body);

                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while updating data in the table");
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
                res.status(400).send("Error occured while updating the data in the table");
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Error occured while updating the data in the table");
            console.error(err)
        });   
    });
    
    //Delete

    router.route('/:id')
    .delete(function(req,res){
        var _taskId=req.params.id;
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                 request.input("TaskID", sql.Int, _taskId)           
                request.execute("sp_DeleteTaskDetails").then(function(){
                transaction.commit().then(function(recordSet){
                conn.close();
                res.status(200).send(req.body);

                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while deleting data in the table");
                    console.error(err)
                });
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error occured while deleting data in the table");
                    console.error(err)
                })
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error occured while deleting data in the table");
                console.error(err)
            });
        }) 
        .catch(function(err){
            conn.close();
            res.status(400).send("Error occured while deleting the data in the table");
            console.error(err)
        });   
    });
    return router;
}

module.exports=routes;