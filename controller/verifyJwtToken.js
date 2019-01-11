var express=require('express');
var jwt=require('jsonwebtoken');
var router=express.Router();

var verifytoken= function (req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !=='undefined')
    {
        bearer=bearerHeader.split(' ');
        bearertoken=bearer[1];
        req.token=bearertoken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

module.exports=verifytoken;