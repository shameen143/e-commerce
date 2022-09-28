import  jwt from "jsonwebtoken";
import { createError } from "./error.js"


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(402,"you are not authenticated"))
    }
    jwt.verify(token,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" , (err,user)=>{
        if(err) return next(createError(403 ,"token is not valid"));
        req.user=user;
        next();
        

    });
};

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id=== req.params.id || req.user.isAdmin){
            next()
        }else{
            if(err) return next(createError(403 ,"you are not authorized"));

        }
});
};

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next ,()=>{
        if( req.user.isAdmin){
            next();
        }else{
            if(err) return next(createError(403 ,"you are not authorized"));

        }
});
};
