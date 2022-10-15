import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Context/AuthContext";
import axios from "axios";
import './signup.css';


const Signup=()=>{
    const[credentials,setCredentials]=useState({
        username:undefined,
        password:undefined,
        
    })

    const {loading,error,dispatch}=useContext(AuthContext);

    const navigate=useNavigate()

    const handleChange=(e)=>{
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}));
    };

    const handleClick=async e=>{
        e.preventDefault()
        dispatch({type:"SIGNUP_START"})
        try{
            const res=await axios.post("http://localhost:5000/api/auth/register",credentials);
            dispatch({type:"SIGNUP_SUCCESS" , payload:res.data.details});
            navigate('/')

        }catch(err){
            dispatch({type:"SIGNUP_FAILURE",payload:err.response.data});
        }
    };
    
    return(
        <div>
            <div className="login">
               <div className="lContainer">
                <input type="text" placeholder="username"  id="username" onChange={handleChange} className="lInput"/>
                <input type="password" placeholder="password"  id="password" onChange={handleChange} className="lInput"/>
                <input type="email" placeholder="email"  id="email" onChange={handleChange} className="lInput"/>
                <button  disabled={loading} onClick={handleClick} className="lButton">Signup</button>
                {error && <span>{error.message}</span>}
                </div> 
            </div>

        </div>
    )
}
export default Signup;