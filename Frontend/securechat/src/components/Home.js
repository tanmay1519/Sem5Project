import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InMessage from './InMessages'
import OutMessage from './OutMessages';
import DoubleSecure from './DouleSecure'
import { Redirect, Link } from 'react-router-dom';
import './Home.css'
import QueryBox from './Querybox';
import encode from './RSAAlgo/Encode';
import Encrypt from './RSAAlgo/Encryption'
import Decrypt from './RSAAlgo/Decryption';
import decode from './RSAAlgo/Decode';
var bigInt = require("big-integer");
export default function Home() {

  // const [values,setvalues]=useState({
  //   liveChatters:[],
  //   currentChat:null,
  //   currentMessages:[],
  //   me:null
  // })
  const [liveChatters, setLiveChatters] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [currentChatName, setCurrentChatName] = useState("")
  const [me, setme] = useState(null)
  const [currentMessages, setcurrentMessages] = useState([])
  const [text, setText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [queries, setQueries] = useState([])
 const [call,setCall]=useState(false)
 const [calltime,setCallTime]=useState(0)

 

  // const {liveChatters,currentChat,currentMessages,me}=values;
  const signout = () => {
    if (localStorage.getItem("securechatLogin")) {
      axios.post("http://127.0.0.1:8000/signout/", {
        email: JSON.parse(localStorage.getItem("securechatLogin")).email
      }).then(
        data => {
          if (data.data.status == "success") {
            try {
              localStorage.removeItem("securechatLogin")
              // console.log(localStorage)
            }
            catch (err) {
              alert("Error Occured")
            }
          }
        }

      )
        .catch(err => console.log(err))
    }
    else {
      // alert("Please login first")
    }
  }
  const preload = () => {
    console.log("SEIT TEIT")
    if (localStorage.getItem("securechatLogin")) {
      // setvalues({...values,me:JSON.parse(localStorage.getItem("securechatLogin")).userid })
      setme(JSON.parse(localStorage.getItem("securechatLogin")).userid)
      chatters();
      receive()
    }
    else {
      // alert("Please Login")
      // console.log(localStorage)
    }
  }
  useEffect(() => {
    console.log("EFFECTS")
    receive()
    preload()
  }, [])

  const handlesearch = (q) => {
    console.log(q)
    let Searches = []
    if (q.length > 0) {
      axios.post("http://127.0.0.1:8000/selectuser/", {
        query: q
      })
        .then(data => {
          if (data.data.status === "success") {
            // console.log(data.data.users)
            setQueries(data.data.users)
          }
        })

    }
    else {
      setQueries([])
    }

  }

  const handleNewChatter = (id, name) => {

    // for (let i=0;i<liveChatters.length;i++){
    //   console.log(liveChatters[i].user_id===id)
    //   if (liveChatters[i].user_id===id) {
    //     setSearchQuery("")
    //     setCurrentChat(id)
    //     getChat(id)
    //   }

    // }
    setSearchQuery("")
    setCurrentChat(id)
    setCurrentChatName(name)
    getChat(id)
    setQueries([])
    // console.log("yes", liveChatters)
  }

  const chatters = () => {
    // console.log(me)
    if (me != null) {
      // console.log("INDIA",me)
      axios.post("http://127.0.0.1:8000/chatters/", {
        user_id: me
      })
        .then(data => {
          // console.log(data)
          if (data.data.status === "success") {

            // setvalues({...values,liveChatters:data.data.chatters})
            setLiveChatters(data.data.chatters)
            // console.log(data.data.chatters)
          }
        })
        .catch(err => { return <div>{err}</div> })
    }
    else {
    }

  }
  const clicked = (id, name) => {
    // console.log(id)
    setCurrentChat(id)
    setCurrentChatName(name)
    getChat(id)

  }
  const getChat = (id) => {

    // console.log(currentChat,"Mumbai")
    // if (me) {
    //   if (id) {
    //     axios.post("http://127.0.0.1:8000/getchat/", {
    //       user1: me,
    //       user2: id
    //     }).then(data => {
    //       console.log(data.data.messages)
    //       // setvalues({...values,currentMessages:data.data.messages})}
    //       let msgData=[];
    //       if (data.data.messages){
    //       msgData = data.data.messages.sort((a, b) => (a.message_id > b.message_id) ? 1 : -1)}
    //       else {
    //       msgData=[]
    //       }
    //       setcurrentMessages(msgData)
    //     }
    //     )
    //   }
    // }
    // else {

    // }
    if (me&&id){
      let sentMessages_main=[],receivedMessages_main=[],messages=[],j=0,k=0
      if (localStorage.getItem("sent"+id)){
            let sentMessages=JSON.parse(localStorage.getItem("sent"+id)).messages
            // console.log((JSON.parse(sentMessages[0])))
            // console.log(typeof(JSON.parse(sentMessages[0])))
            for (let i=0;i<sentMessages.length;i++){
              sentMessages_main[j]=JSON.parse(sentMessages[i])
              j++
            }
      }
      
      if (localStorage.getItem("receive"+id)){
         let receivedMessages=JSON.parse(localStorage.getItem("receive"+id)).messages
         for (let i=0;i<receivedMessages.length;i++){
          receivedMessages_main[k]=JSON.parse(receivedMessages[i])
          k++
        }
      }
     let n,l=0,m=0;
      n=sentMessages_main.length + receivedMessages_main.length
      for (l=0;l<sentMessages_main.length;l++){
        messages[m]=sentMessages_main[l]
        m++;
      }
      for (l=0;l<receivedMessages_main.length;l++){
        messages[m]=receivedMessages_main[l]
        m++;
      }
      console.log(messages)
    let  msgSorted = messages.sort((a, b) => (a.message_id > b.message_id) ? 1 : -1)
      setcurrentMessages(msgSorted)
      // messages=sentMessages+receivedMessages
      // console.log(typeof(messages))
    // let  msgData = messages.sort((a, b) => (a.message_id > b.message_id) ? 1 : -1)
      // setcurrentMessages(msgData)

    }
  }
  // console.log(me, "Me")
  const securesend = (txt, highsec) => {
    console.log(text, currentChat)

    if (me && currentChat) {
      axios.post('http://127.0.0.1:8000/getkey/', {
        user_id:currentChat
      })
        .then(data1 => {
          if (data1.data.status === "success") {
            console.log(data1.data)
            let keyData=data1.data.keyData.key
            let keyList=keyData.split("+")
            let n,e,encoded,encrypted;
            if (keyList.length===2){
              n=Number(keyList[0])
              e=Number(keyList[1])
              encoded=encode(txt)
             encrypted = Encrypt(encoded,n,e)
      axios.post('http://127.0.0.1:8000/send/', {
        sender: me,
        receiver: currentChat,
        message: encrypted,
        highSecurity: highsec
      })
        .then(data => {
          console.log(data.data)
          if (data.data.status === "success") {
            let sendid= "sent"+String(currentChat)
          
             
              let msg={
                message_id:data.data.msg_id,
                sender:me,
                receiver:currentChat,
                message:txt
              }
              if (localStorage.getItem(sendid)){
               let  msg_list = JSON.parse(localStorage.getItem(sendid)).messages,newArray=[],i=0
               for ( i=0;i<msg_list.length;i++){
                  newArray[i]=msg_list[i]
               }
              //  console.log(newArray)
               newArray[i]=JSON.stringify(msg)
              //  console.log(newArray)

               let messages = {messages:newArray}
               localStorage.setItem(sendid,JSON.stringify(messages))

              }
              else {
                let messages = {messages:[JSON.stringify(msg)]}
                localStorage.setItem(sendid,JSON.stringify(messages))
              }
            // TODO: BHAYANKAK ERRORS
            
            getChat(currentChat)
            setText("")
          }
        })

          }}
        })



    }
  }

  const receive = () => {
    console.log("receive")
    if (me) {
      axios.post("http://127.0.0.1:8000/receive/", {
        user_id: me
      }).then(data => {
        if (data.data.status === "success") {
          // console.log(data.data.messages);
          let messages = data.data.messages,Message ,receive_id
          
          for (let  i=0;i<messages.length;i++){

              Message=messages[i]
              Message.message = Decrypt(Message.message)
              receive_id="receive"+String(Message.sender)
              if (localStorage.getItem(receive_id)){
                  let msg_list=JSON.parse(localStorage.getItem(receive_id)).messages,newArray=[],i=0
                  for (i=0;i<msg_list.length;i++){
                    newArray[i]=msg_list[i]
                  }
                  newArray[i]=JSON.stringify(Message)
                  let messages = {messages:newArray}
                localStorage.setItem(receive_id,JSON.stringify(messages))

                  
              }
              else {
                let msg_list={messages:[JSON.stringify(Message)]}
                localStorage.setItem(receive_id,JSON.stringify(msg_list))
              }

          }
          getChat(currentChat)
        }
      })
    }
    else {
      // alert("Please Login")
      console.log(localStorage)
    }
  }
  // var currentTime, seconds, checkingloop = true;
  // const continuous = (check) => {
  //   currentTime = new Date()
  //   seconds = currentTime.getSeconds()
  //   // console.log("YES")
  //   setTimeout(()=>{},1000)

  //   if (seconds % 5 === 1 && lastCall != seconds && checkingloop) {
  //     setTimeout(()=>{},1000)
  //     check(false)
  //     console.log("SADHi")
  //     // receive()
  //     // chatters()
  //     setLastCall(seconds)
  //     setTimeout(()=>{},1000)
  //     check(true)
  //   }


  // }
  // const update = (x) => {
  //   checkingloop = x
  // }
  // // let today;
  // // today=new Date()
  // setInterval(()=>{continuous(update);setTimeout(()=>{},1000)},100)
// receive()
// var checki770ng = bigInt(99**200)
// console.log(checking)
  // var add = 0, isTrue = false;
  // const update = () => {

  //   add++;
  //   if (add % 3000 === 1) {
  //     isTrue = true;
  //   }
  //   if (isTrue) {
  //     isTrue = false;
  //     // chatters()
  //     // receive()

  //   }
  // }
  // setInterval(update, 1000)

if (liveChatters.length===0 && localStorage.getItem("securechatLogin"))
chatters()

  const update=()=>{
    let seconds = new Date().getSeconds();
    let diff = seconds - calltime
    if (diff<0)
    diff*=(-1)
    if(diff>10){
      chatters()
    receive()
      setCallTime(seconds)
    }
    
  }
  update()

  return (
    <div>
      <nav >
        <div style={{ width: "30%", color:   "white" }}>
          <h2>SecureChat</h2>
        </div>
        <div style={{ width: "30%", paddingTop: "10px" }}>
          <a style={{ color:   "white" }} href="/signup">Signup</a>&nbsp;&nbsp;
          <a style={{ color:   "white" }} href="/signin">SignIn</a>&nbsp;&nbsp;
          <a style={{ color:   "white" }} onClick={() => signout()}>Signout</a>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "40%" }}>

          <input id="searchbar" style={{ width: "80%", paddingTop: "15px", height: "15px" }}
            onChange={(s) => { setSearchQuery(s.target.value); handlesearch(s.target.value) }} value={searchQuery}
            type="text" placeholder="Search Person" />

          <button id="backup" style={{
            width: "15%", marginLeft: "3px", display: "flex", alignItems: "center", justifyContent: "center"
            , color: "white", backgroundColor: "#03203C"
          }} type="button">Backup</button>
        </div>
      </nav>
      <div class="header" style={{ display: "flex", flexDirection: "row" }}>
        <div style={{
          width: "30%",
          border: " 1px solid aliceblue"
        }}><strong><h3>ChatList</h3></strong></div>

        <div style={{ width: "70%", border: "1px solid aliceblue" }}><h3 id="Name_Chats">
          {currentChatName.length > 0 ? currentChatName : "Name"}</h3></div>
      </div>

      <div class="Container" >

        <div class="chatlist">

          {
            liveChatters.map((Chatter, key = Chatter.user_id) => {
              return <button class="chatperson" onClick={() => clicked(Chatter.user_id, Chatter.name)}  ><h3 id="Name">{Chatter.name}</h3></button>
            })
          }
        </div>
        <div class="Chat">
          <div style={{ flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", display: "flex" }}>
            {queries.map((query, key = query.user_id) => {
              // console.log((query.user_id), (me), (me && query.user_id !== me)); r
              return (

                (me && query.user_id !== me) && (<button class="newChatterbtn" onClick={() => { handleNewChatter(query.user_id, query.name) }} >
                  <h4 > {query.name}</h4>
                  {/* <h4 >{query.email}</h4> */}
                </button>)
              )
            })}
          </div>
          {
            (currentMessages.length > 0) && (currentMessages.map(message => {
              // console.log(message.sender, message.receiver, me)
              if (message.sender == me) {
                return (
                  <OutMessage msg={message.message} />
                )
              }
              else {
                console.log(message.highSecurity)
                if (message.highSecurity === true) {
                  // console.log("India")
                  return <DoubleSecure msg={decode((message.message))}  />
                }
                else {
                  // console.log("Pakistan")
                  return <InMessage msg={decode((message.message))} />
                }
              }

            }))}

        </div>

      </div >
      <div style={{
        display: "flex", justifyContent: "space-evenly", alignItems: "center"
        , flexDirection: "row", padding: "20px", scrollPaddingBottom: "0px",
        border: "2px solid black"
      }} >


        <input style={{ width: "60%", height: "25px", paddingBottom: "0px;" }} type="text" value={text}
          onChange={(txt) => { setText(txt.target.value) }}
        />
        <button onClick={() => { securesend(text, false) }}
          style={{
            width: "10%", height: "35px", display: "flex", alignItems
              : "center", justifyContent: "center", backgroundColor: "#03203C", color: "white"
          }} type="button">Secure</button>
        <button onClick={() => { securesend(text, true) }} style={{
          width: "10%", height: "35px", display: "flex", alignItems
            : "center", justifyContent: "center", backgroundColor: "#03203C", color: "white"
        }} type="button">Secure + </button>

      </div>
    </div>



  )
}