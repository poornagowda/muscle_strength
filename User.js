const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Vital = require('../models/Vital');
const MaleFemale = require('../models/MaleFemale');
const Age = require('../models/Age');
const Month = require('../models/Month');


const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

var url = require('url');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const signToken = userID =>{
    return JWT.sign({
        iss : "healthcare",
        sub : userID
    },"NoobCoder",{expiresIn : "1h"});
}

userRouter.post('/register',(req,res)=>{
    const { pid,name,gender,age,mobile,address,email,password,role } = req.body;

    //validation

    if(!pid || !name || !mobile || !gender || !age || ! address || !email || !password){

        return res
            .status(400)
            .json({message : {msgBody : "All fields are required", msgError: true}});
            
    }

    else if(password.length<6){

        return res
            .status(400)
            .json({message : {msgBody : "Password should be atleast 6 charecter long!", msgError: true}});
            
    }
    else{

        User.findOne({pid},(err,user)=>{
            if(err)
                res.status(500).json({message : {msgBody : "Error1 has occured", msgError: true}});
            if(user)
                res.status(400).json({message : {msgBody : "Patient id is already taken", msgError: true}});
            
            
            else{
                
                User.findOne({email},(err,user)=>{
                    if(err)
                        res.status(500).json({message : {msgBody : "Error1 has occured", msgError: true}});
                    if(user)
                        res.status(400).json({message : {msgBody : "Email ID is already taken", msgError: true}});
                    
                    
                    else{
                        
                    const newUser = new User({pid,name,gender,age,mobile,address,email,password,role});
                        newUser.save(err=>{
                            if(err)
                                res.status(500).json({message : {msgBody : "Error2 has occured", msgError: true}});
                            else
                                res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
                        });
                        
                    }
                });
                
            }
        });

    }

    
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,pid,email,role} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,user : {pid,email,role}});
    }
     
    
    
});

userRouter.get('/logout',(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});





userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});



userRouter.get('/viewOneUser', urlencodedParser,function (req, res) {
    console.log('Getting One user');
    const pid=req.query.pid;
    //res.send(req.query.pid)
    console.log(pid)
    
    const query  = User.where({ pid: pid});
    query.find()
  
      .exec(function(err,users){
        if(err){
          res.send('error');
        }else{
          console.log(users);
          res.json(users);

        }
      })

  });
    
    
 




  userRouter.get('/viewAllUser', async (req, res) => {
    console.log('Getting all user');
    const query  = User.where({ role: 'user'});
    query.find()
  
      .exec(function(err,users){
        if(err){
          res.send('error');
        }else{
          console.log(users);
          res.json(users);

        }
      })
  
    
  });


  /////////////////////////VITALS START///////////////////////////////////////////


   userRouter.get('/viewOneUserVitals', urlencodedParser,function (req, res) {
    console.log('Getting One user');
    const pid=req.query.pid;
    //res.send(req.query.pid)
    console.log(pid)
    
    
    const query  = User.where({ pid: pid});
    query.findOne()
  
      .exec(function(err,users){
        if(err){
          res.send('error');
        }else{


        var view_user=
            {
              pid:users.pid,
              name:users.name,
              mobile: users.mobile,
              address:users.address,
              email:users.email
              
            }
            //console.log(view_user)

    const query1  = Vital.where({ pid: pid});
    query1.findOne()
          .sort({ field: 'asc', _id: -1 }).limit(1)
  
          .exec(function(err,vitals){
            if(err){
              res.send('error');
            }else{


            var view_vitals=[

              {
                pid:view_user.pid,
                name:view_user.name,
                muscle_strength:vitals.muscle_strength,
                date:vitals.date
                
                
              }

            ]
              
                console.log(view_vitals)

              
            res.json(view_vitals);
            

            }
          })

      
        
        

        }
      })


  });
    
    
 




  userRouter.get('/viewAllUserVitals', async (req, res) => { ///////Not Used/////
    console.log('Getting all user');

    const query  = Vital.where({ });
    query.find()
  
      .exec(function(err,users){
        if(err){
          res.send('error');
        }else{
          console.log(users);
          res.json(users);

        }
      })

  });

/////////////////////////VITALS END////////////////////////////////////////



   userRouter.post('/resetpass',(req,res)=>{
    const { pid,email,password } = req.body;

    //validation

    if(!pid || !email || !password){

        return res
            .status(400)
            .json({message : {msgBody : "All fields are required", msgError: true}});
            
    }

    else if(password.length<6){

        return res
            .status(400)
            .json({message : {msgBody : "Password should be atleast 6 charecter long!", msgError: true}});
            
    }
    else{

        User.findOne({pid,email},(err,user)=>{
            if(err)
                res.status(500).json({message : {msgBody : "Error1 has occured", msgError: true}});
            if(!user)
                res.status(400).json({message : {msgBody : "Wrong Credentials", msgError: true}});
            
            else{
                        
                    const password1=bcrypt.hashSync(password,10)
                           
                        User.updateOne({ pid: pid }, { password: password1 },err=>{
                            if(err)
                                res.status(500).json({message : {msgBody : "Error2 has occured", msgError: true}});
                            else
                                res.status(201).json({message : {msgBody : "Password successfully Changed", msgError: false}});
                        });
                        
                    }
               
                
            
        });

    }

    
});



userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {pid,email,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {pid,email,role}});
    
});






userRouter.get('/regadmin',async (req,res)=>{
   // const { email,password,role } = req.body;

   const email ="admin@gmail.com";
   const password = "admin";
   const role = "admin";

    
      const newUser = new User({email,password,role});
      await newUser.save(err=>{
            if(err)
                res.status(500).json({message : {msgBody : "Error2 has occured", msgError: true}});
            else
                res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
        });

  
});





userRouter.get('/sendmail',async (req,res)=>{ //////////////Not Used
    

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {

          user: 'majorproject201@gmail.com',
          pass: 'major201'

        }
      });
      
      var mailOptions = {
        from: 'majorproject201@gmail.com',
        to: 'hrishi@ansprotech.com',
        subject: 'checking',
        text: 'Done!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
   
 });


//////////////////////////////Test//////////////////////////

  
userRouter.get('/viewAll', urlencodedParser,function (req, res) {
  console.log('Getting One user');
  const pid=req.query.pid;
  //res.send(req.query.pid)
  console.log(pid)

  const query  = Vital.where({ pid: pid});
  query.find()
  .sort({ date: 'asc'})
  .limit(10)

    .exec(function(err,users){
      if(err){
        res.send('error');
      }else{
        console.log(users);
        res.json(users);

      }
    })

  
});


///////////////////////////////////////////////////////////////////

userRouter.get('/malefemale', urlencodedParser,function (req, res) {
  console.log('Getting malefemale');
  
  //res.send(req.query.pid)
  
  
  const query  = MaleFemale;
  query.find()
  
    .exec(function(err,users){
      if(err){
        res.send('error');
      }else{
        console.log(users);
        res.json(users);

      }
    })

  
});




///////////////////////////////////////////////////////////////////

userRouter.get('/age', urlencodedParser,function (req, res) {
  console.log('Getting age');
  
  //res.send(req.query.pid)
  
  
  const query  = Age;
  query.find()
  
    .exec(function(err,users){
      if(err){
        res.send('error');
      }else{
        console.log(users);
        res.json(users);

      }
    })

  
});



///////////////////////////////////////////////////////////////////

userRouter.get('/month', urlencodedParser,function (req, res) {
  console.log('Getting month');
  
  //res.send(req.query.pid)
  
  
  const query  = Month;
  query.find()
  
    .exec(function(err,users){
      if(err){
        res.send('error');
      }else{
        console.log(users);
        res.json(users);

      }
    })

  
});








module.exports = userRouter;