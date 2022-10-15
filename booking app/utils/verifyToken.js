import  jwt from "jsonwebtoken";
import { createError } from "./error.js"


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(402,"you are not authenticated"))
    }
    jwt.verify(token,"8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=" , (err,user)=>{
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
