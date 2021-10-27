const randomPrime = require('random-prime').randomPrime;

function gcd (x,y) {
  while (y)
  {
    let t=y
    y=x%y
    x=t
  }
  return x
}

const generateKeys= () => {
    let iter=0;
    let P = 0
    let Q = 0, n
    while (P == Q )  {
        P = randomPrime(11,70)
        Q = randomPrime(11,70)
    }
    
 
    
    n = P * Q
    let phi = (P - 1)*(Q - 1)
    let    e=randomPrime(2,phi)
    while (gcd(e,phi)!==1)
    e=randomPrime(2,phi)
  
  let d,k=1
    
    while (!d) {
       
        if (((k * phi )+ 1) % e === 0) {
            // console.log("YES",P,Q)
            d =  ((k * phi + 1) / e)
            break;
        }
        
        k++
        if (k==n){
          return {e:0}
        }
    }
    // console.log(n,e,d)
    
    return {n:n,e:e,d:d}
}


export default generateKeys;