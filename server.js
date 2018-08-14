var express=require('express');
var app=express();
var port=process.env.port||1337

var bodyParser=require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

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
