import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';

import './signin.css'
export default function Signin () {
    const [values,setvalues] = useState({
        email:"",
        password:""
    })

    const handlechange = name => event => {
        setvalues({...values,[name]:event.target.value})
    }
    const {email,password} = values;
    return (
        <div>
               
    <center> <h1> Login Form </h1> </center>   
    <form>  
        <div class="container">   
            <label>Username : </label>   
            <input type="text" placeholder="Enter Email" name="username" onChange={handlechange("email")} required/>  
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" onChange={handlechange("password")} required/>  
            <button type="button" onClick={()=>{axios.post('http://127.0.0.1:8000/signin/',{
                email,password
            }).then(data=>{
                console.log(data.data)
                if (data.data.status==="success"){
            
                    localStorage.setItem("securechatLogin",JSON.stringify({email:email,userid:data.data.userid}))
                    
            }}
                
                )
                .catch(e=>console.log(e))
            }} >Login</button>   
            <input type="checkbox" checked="checked"/> Remember me   
            <button type="button" class="cancelbtn"> Cancel</button>   
            Forgot <a href="#"> password? </a>   
        </div>   
    </form>    
        </div>
    )
}