const modulo = (num,div) => {
    if (typeof(num)==="number"){
    if (num<div){
        return num
    }
    if (String(num).length === String(div).length){
       
        return Math.floor(num%div)
    }}
    if (    typeof(num)==="string"  ||num>div){

     var block = "",i=0,strNum=String(num),carry=""

        while (i<strNum.length){
            if (block!==""){
                if (Number(block)>=div){
                    carry=String(block%div)
                    block=carry
                }
            }

            if (Number(block) < div )
                block = block + strNum[i]
            i++;
        }
        // console.log(block,carry)
        if (block!==""){
            // if (Number(block)>=div){
                carry=String(block%div)
                block=carry
            // }
        }
        return Number(carry)
        // console.log(block,carry)
    }
   

}
export default modulo
// console.log(modulo(2002,5))
// console.log(modulo(21,5))
// console.log(modulo(22,5))
// console.log(modulo(23,5))
// console.log(modulo(24,5))

// let i=0,c=0;
// while (i<100000){

//     let a=Math.floor(Math.random() * 10000000000);
//     let b=0;
//     while (b==0)
//      b=Math.floor(Math.random() * 10000);

//     if (a%b===modulo(a,b)){
//         // console.log(a%b,modulo(a,b))
//         c++;
//     }
//     i++;
//     if(i%1000000===0)
// console.log(c)
// }

// console.log(c)