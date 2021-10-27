import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect,Link } from 'react-router-dom';
import './signup.css';
import generateKeys from './GenerateKeys';
export default function Signup () {

    const [values,setvalues]=useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password} = values;
    const handlechange = name => event => {
        setvalues({...values,[name]:event.target.value})
    }

    return (
        <div>
       <center> <h1> Signup Form </h1> </center>   

        <div class="container">   
            <label>Name : </label>   
            <input type="text" placeholder="Name" value={name}onChange={handlechange("name")} name="name" required/>
            <label>Email : </label>   
            <input type="email" placeholder="Enter Email" value={email} onChange={handlechange("email")}name="email" required/>  
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" value={password} onChange={handlechange("password")}name="password" required/>  
            <button type="submit" onClick={()=>{
                 
                let key= generateKeys()
                while (key.e===0)     
                  { key= generateKeys()}
                console.log(key)
           
                axios.post('http://127.0.0.1:8000/signup/',{
                name,email,password
            }).then(data=>{
                console.log(data.data)
                if(data.data.status==="success"){
                    axios.post('http://127.0.0.1:8000/setkey/',{
                        user_id:data.data.userid,
                        public_key:String(key.n)+'+'+String(key.e)
                    })
                    .then(status=>{console.log(status)
                       if( status.data.status==="success"){
                           localStorage.setItem("SecureKey",JSON.stringify({d:key.d,n:key.n}))
                           alert("Done!!")
                       }
                    })
                }
            })
                .catch(e=>console.log(e))
            
            }}>Signup</button>   
            <input type="checkbox" checked="checked"/> Remember me   
            <button type="button" class="cancelbtn"> Cancel</button>   
            {/* Forgot <a href="#"> password? </a>    */}
        </div>   
] 
        </div>
    )
}