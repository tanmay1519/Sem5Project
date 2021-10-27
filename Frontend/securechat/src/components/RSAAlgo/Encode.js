const encode = (text)=> {
    let i=0,encodedText="",x;
    console.log(text)
    for (i=0;i<text.length;i++){
        x=text.charCodeAt(i);

        if (x>=65&&x<=90){
            x-=55;
        }
        else if (x>=97&&x<=122){
            x-=47
        }
        else {
            let ch=text[i];
            if (ch===" "){
                x=78
            }
            else if (ch==="!"){
                x=36
            }
            else if (ch==="."){
                x=37
            }
            else if (ch===","){
               x= 38
            }
            else if (ch==="@"){
                x=39
            }
        }
        encodedText+=String(x)
    }
    console.log(encodedText)
    return encodedText;
}


export default encode;