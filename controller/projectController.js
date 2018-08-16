var express=require('express');
var router=express.Router();
var sql=require('mssql');
var conn=require('../connection/connect')();

var routes=function(){
    router.route('/')
    .get(function(req,res){
conn.connect().then(function(){

var sqlQuery="Select ProjectID,ProjectName from tbl_Project";
var req=new sql.Request(conn);
req.query(sqlQuery).then(function(recordset){
    res.json(recordset.recordset);
    conn.close();
})
.catch(function(err){
    conn.close();
    res.status(400).send('Some internal error occured.')
    console.error(err);

});
})
.catch(function(err){
conn.close();
res.status(400).send('Internal error in api.')
console.error(err);
});
    });
    
    router.route('/')
    .post(function(req,res){
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("ProjectName", sql.VarChar(50), req.body.ProjectName)
                request.execute("sp_InsertProjects").then(function(){
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
        var _projectId=req.params.id;
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("ProjectID", sql.Int, _projectId)
                request.input("ProjectName", sql.VarChar(50), req.body.ProjectName)
                request.execute("sp_UpdateProjects").then(function(){
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
    
    //Delete

    router.route('/:id')
    .delete(function(req,res){
        var _projectId=req.params.id;
        conn.connect().then(function(){
            var transaction=new sql.Transaction(conn);
            transaction.begin().then(function(){
                var request=new sql.Request(transaction);
                request.input("ProjectID", sql.Int, _projectId)
                request.execute("sp_DeleteProjects").then(function(){
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