import express from 'express'
import mongoose, { connect } from 'mongoose';
import cors from 'cors'
//import config from './db/config';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from 'cookie-parser';

const app=express();
//config.config();
 mongoose.connect('mongodb://localhost:27017/booking-app',{useNewUrlParser:true});
 var conn = mongoose.connection;
 conn.on('connected', function() {
     console.log('database is connected successfully');
 });
 conn.on('disconnected',function(){
     console.log('database is disconnected successfully');
 })
 conn.on('error', console.error.bind(console, 'connection error:'));
 
 

app.use(cookieParser())
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)

app.use((err,req,res,next)=>{
      const errorStatus=err.status || 500
      const errorMessage=err.message || "something went wrong"
      

      return res.status(500).json({
            success:false,
            status:errorStatus,
            message:errorMessage,
            stack:err.stack,
      }

      )
})




app.listen(5000)
      //connect();
      console.log("Connected to backend");




    
    
