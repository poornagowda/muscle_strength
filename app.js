const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(express.json());

const cors = require("cors");

app.use(
    cors({
      origin: [
        "http://localhost:3000",
        
      ],
      credentials: true,
    })
  );

  app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/muscle_strength',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});



const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});