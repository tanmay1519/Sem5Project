import exponential from './exponent'
import modulo from './modulo'
var BigInt = require("big-integer");
const Encrypt = (msg, n, e) => {


    let toencry, encryptedText = "", encrypart, expo;
    // console.log(msg, n, e, "Dravid")
    for (let i = 0; i < Math.floor(msg.length / 2); i++) {
        toencry = ""
        toencry = toencry + msg[2 * i] + msg[2 * i + 1]

        toencry = Number(toencry)
        console.log(toencry)
        n = BigInt(n)
        expo = exponential(toencry, e, n)
        encrypart = modulo(expo,n)
        // console.log(expo, n,"K")
        if (encryptedText === "")
            encryptedText = String(encrypart)
        else
            encryptedText = encryptedText + '+' + String(encrypart)
    }
    console.log(encryptedText)
    return encryptedText
}

export default Encrypt

