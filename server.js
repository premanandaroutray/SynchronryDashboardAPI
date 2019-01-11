var express=require('express');
var app=express();
var port=process.env.port||1340
var cors = require('cors');
var bodyParser=require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    //res.header("Access-Control-Allow-Headers",'Content-Type', 'Authorization');
   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method==='OPTIONS')
    {
        
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });

const userDetailsController=require('./controller/userDetailsController')();
const taskDetailsController=require('./controller/taskDetailsController')();
const loginController=require('./controller/loginController')();
const menuController=require('./controller/menuController')();
const dashboardController=require('./controller/dashboardController')();
const dashboardtaskController=require('./controller/dashboardtaskController')();

app.use("/api/userDetails",userDetailsController);
app.use("/api/login",loginController);
app.use("/api/menus",menuController);
app.use("/api/dashboard",dashboardController);
app.use("/api/dashboardtask",dashboardtaskController);
const projectController=require('./controller/projectController')();
const roleController=require('./controller/roleController')();
const reportmanagerController=require('./controller/reportmanagerController')();
const usersController=require('./controller/usersController')();

app.use("/api/userDetails",userDetailsController);
app.use("/api/login",loginController);
app.use("/api/taskDetails",taskDetailsController);
app.use("/api/projects",projectController);
app.use("/api/Roles",roleController);
app.use("/api/users",usersController);


app.listen(port,function(){
    var datetime=new Date();
    var message="Server is running on Port:"+port+"Started at:"+datetime;
    console.log(message);
});
module.exports=app;
