import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'

export default function DouleSecure (props){

    const [password,setPassword] = useState ("")
    const [show,setShow]=useState(false)
  
    const reset = () => {
      setShow(false)
      setPassword("")
    }
    const checkuser = (password) =>{
        let email =  JSON.parse(localStorage.getItem("securechatLogin")).email
        
        axios.post('http://127.0.0.1:8000/verifypassword/',{email,password})
        .then(data=>{
          if (data.data.status==="success"){
            setShow(true)
            setInterval(reset,1000*(props.msg.length))
          }
        })
      }

    return ( 
            <div class="recieved" style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
              <p>{show&&props.msg}</p>
          { !show &&    <input placeholder="Enter password " onChange={(e)=>{setPassword(e.target.value);checkuser(e.target.value)}}  value={password} type="password"  style={{fontSize:"22"}}  />}
            </div>
        )
}