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
const loginController=require('./controller/loginController')();
app.use("/api/userDetails",userDetailsController);
app.use("/api/login",loginController);


app.listen(port,function(){
    var datetime=new Date();
    var message="Server is running on Port:"+port+"Started at:"+datetime;
    console.log(message);
});
module.exports=app;
