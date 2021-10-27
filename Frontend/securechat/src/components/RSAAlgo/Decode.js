const decode = (text)=> {
    console.log(text)
    let i=0,decodedText="",num1,num2,num;
    for (i=0;i<Math.floor(text.length/2);i++){
        num1=text[2*i]
        num2=text[2*i+1]
        num=num1+num2
        console.log(num)
        num=Number(num)
        if (num>=10&&num<=35){
            num+=55
            decodedText=decodedText+String.fromCharCode(num)
        }
        else if (num>=50&&num<=75){
            num+=47
            decodedText=decodedText+String.fromCharCode(num)

        }
        else {
            if (num===78)
            decodedText+=" "

            if (num===36)
            decodedText+="!"

            if (num===37)
            decodedText+="."

            if (num===38)
            decodedText+=","

            if (num===39)
            decodedText+="@"

        }



    }
    return decodedText
}

export default decode