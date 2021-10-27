
// function getPublic_PrivateKey(){

// }

// function mult(x,y){
//     let carry=0;
//     let a;
//     for  (var i=x.length-1;i>=0;i--){
//         a=Number(x[i])*y+carry;
//         b=a%10;
//         a=Math.floor(a/10)
//         prev=x.slice(0,i)
//         next=x.slice(i+1,x.length)
//         x=prev+b+next
//         carry=Number(a);
//     }
//     if (carry==0)
//         return x
//     return String(carry)+x
// }

// function mypower(a,b){
//     num=String(a);
//     m_by = a;
//     if (b==0)
//     return 1
//     if (b==1)
//     return Number(a)
//     while (b>1){
//        num= mult(num,m_by);
//        console.log(num)
//     //    break
//        b--;
//     }
//     return (num)
// }


// function encrypt(msg,n,e){
//     mypower(n,e)
// }

// function decrypt(cipher) {

// }


// function modulo (x,n) {
//     // if (x<n) {console.log("INDIA")
//     // return x ;}
  
//     if (x==n) return 0;
//     let i;
//     let block = String(n).length;
//     x=String(x);
//     let currentBlock=x.slice(0,block);
//     if (x.length<=String(n).length)
//     return Number(x)%n

//     for (i=(block);i<x.length;i++){
//         // console.log(currentBlock,n)
//         if(currentBlock.length<block || n>Number(currentBlock)){
      
//         currentBlock=currentBlock+x[i]
//         //    console.log(currentBlock)
//             continue;
//         }
//         else {
//             let y=(Math.floor((Number(currentBlock))/n))
//             currentBlock=String(Number(currentBlock)%n);
//             currentBlock=currentBlock+x[i]
//             console.log(currentBlock,n,x,i)
//         }
//     }
//     // console.log(currentBlock)
//     return Number(currentBlock)%n;

// }

// // let fails=0;

// // for (var i =0 ; i<1000000;i++){
// //     let x=Math.floor(Math.random() * 100000000);
// //     let y=Math.floor(Math.random() * 100);
// //     while (y==0)
// //         y=Math.floor(Math.random() * 100);
// //     a1=x%y
// //     a2=modulo(x,y)
   
// //     if (a1!=a2){
// //         fails++;
// //     console.log(a1,a2,x,y);}
// // }
// // 5 2 780 31
// // console.log(modulo(780,31))
// console.log(1111111111111111111111111111111111111111**888883)
// console.log(mypower('1111111111111111111111111111111
var x

const multiply = (num) => {
    let carry = 0 ;
let     i=num.length -1
    let newNum="";
    while (i>=0){
        let onedigit = num [i]
        
        onedigit=Number(onedigit)
        onedigit=onedigit*x + carry
        onedigit=String(onedigit)
        carry=0
        if (onedigit.length>=2)
            carry = Number(onedigit.slice(0,onedigit.length -1))
        let pushDigit = onedigit[onedigit.length -1]
        newNum = pushDigit + newNum
        i--;
    }
    if (i<0){
        if (carry!=0)
    return (String(carry)+newNum)
else return newNum
}
}


const  exponential = (y,e,k) => {
    k=String(k).length
    x=y
    k++;
    k++;
 let   num=String(y)
    while (e!=1){
        e--;
        num = (multiply(String(num)))
        // console.log(num.length,k)
        // if (num.length - k >0){
        //     let start = num.length - k;
        //    num= num.slice(start,num.length)
        // //    console.log(k,num)
        // }
      
    }
    return num
}

export default exponential



// let j=0;
// let correct=0,game=0;
// console.log(exponential(3,4))
// const writestr = (a) => {
//     let i=0;

//     for (i=0;i<a.length;i++){
//         console.log(a[i])
//     }
// }

// while (j<10000){
//     let a=Math.floor(Math.random() * 20);
//     let b=Math.floor(Math.random() * 5);
//     if (a==0 || b==0)
//     game++;
//     else {
//         if (Math.pow(a,b)===(Number(exponential(a,b))))
//         correct++;
//         else{
//             let c=(Math.pow(a,b)).toLocaleString('fullwide',{useGrouping:false})
//             // 1394,2011writestr(String(c))
//             console.log("\n")
//             console.log(c,String(exponential(a,b)),a,b)
//             console.log(Number(BigInt(String((exponential(1394,2011))))%BigInt(3127) ))
//             break
//         }


//             }
//     j++;
//     console.log(correct,game)
// }

// console.log(correct,game)

// // console.log(exponential(2,10))