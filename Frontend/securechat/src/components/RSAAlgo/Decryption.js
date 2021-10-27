import exponential from './exponent'
import modulo from './modulo'
var BigInt = require("big-integer");

const Decrypt = (txt)=>{
    let keyData=JSON.parse(localStorage.getItem("SecureKey")),n,d;
    // console.log(keyData)
    n=keyData.n
    d=keyData.d
    // console.log(n,d)
    let decryptedmsg="",currentmsg,decry
    let msgList = txt.split('+')
    n=BigInt(n)
    // console.log(msgList)
    for (let i=0;i<msgList.length;i++){
        currentmsg=msgList[i]
        currentmsg=Number(currentmsg)
        let decry1 = exponential(currentmsg,d)
        decry=modulo(decry1,n)
        decryptedmsg=decryptedmsg+String(decry)
      
        console.log(decry,currentmsg)
    }
    // console.log(decryptedmsg)
    return decryptedmsg
    
}

export default Decrypt;