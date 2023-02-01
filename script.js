'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderCountry= function(data, className=''){
    const html= `
    <article class="country"${className}>
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`
    countriesContainer.insertAdjacentHTML('beforeend',html)
    countriesContainer.style.opacity= 1;
}
const renderError= function(msg){
    countriesContainer.insertAdjacentText('beforeend',msg)
    //countriesContainer.style.opacity= 1;
}
const getJSON= function(url,errorMsg='Something went wrong'){
  return  fetch(url).then((response)=>{
        console.log(response)
        if (!response.ok) throw new Error (`${errorMsg} (${respone.status})`)
  return response.json()
})
}

///////////////////////////////////////

/*
const getCountryAndNeighbour= function(country){
    //AJAX call country 1
    const request= new XMLHttpRequest();
    request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);//request for data from server
    request.send();

    request.addEventListener('load',function(){
        const [data]= JSON.parse(this.responseText)
        console.log(data)
        //render country 1
        renderCountry(data)
        //Get neighbour country
        const [neighbour]= data.borders;
        if(!neighbour) return;
        //AJAX call 2
        const request2= new XMLHttpRequest();
        request2.open('GET',`https://restcountries.eu/rest/v2/alpha/${neighbour}`);//request for data from server
        request2.send();
        request2.addEventListener('load',function(){
        const data2= JSON.parse(this.responseText)
        console.log(data2)
        renderCountry(data2,'neighbour')
        })

    })
};
getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');
*/
/*
//CALLBACK HELLS
setTimeout(()=>{
    console.log('1 second passed')
    setTimeout(()=>{
        console.log('2 seconds passed')
        setTimeout(()=>{
            console.log('3 seconds passed')
            setTimeout(()=>{
                console.log('4 seconds passed')
            },1000)
        },1000)
    },1000)
},1000)
*/

//PROMISES AND FETCH API
/*
const request= new XMLHttpRequest();
    request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);//request for data from server
    request.send();
    */
   //the then method is only called when a promise is fulfilled, the catch method is called when promise is rejected
   //Finally method is called irrespective of the result.its effective when a promise is returned
/*
const getCountryData= function(country){
    //country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then((response)=>{
        console.log(response)
        if (!response.ok) throw new Error (`Country not found (${respone.status})`)
  return response.json()
})
    .then((data)=>{
    renderCountry(data[0])
    const neighbour= data[0].borders[0]
    if (!neighbour) return;
    //country 2{2nd ajax call}
    return fetch('https://restcountries.eu/rest/v2/alpha/${neighbour}')
}).then((response)=>response.json()).then((data)=> renderCountry(data,'neighbour'))
.catch((err)=>{
    console.error(`${err}!!!`)
    renderError(`Something went wrong......${err.message}. Try again!!`)
}).finally(()=>{
countriesContainer.style.opacity= 1;
})
}
btn.addEventListener('click',function(){
    getCountryData('portugal')
    getCountryData('dgtshl')
})
*/
/*
const getCountryData= function(country){
    //country 1
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`,'Country not found')
    .then((data)=>{
    renderCountry(data[0])
    const neighbour= data[0].borders[0]
    if (!neighbour) throw new Error('No neighbour found!!');
    //country 2{2nd ajax call}
    return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`,'Country not found')
}).then((data)=> renderCountry(data,'neighbour'))
.catch((err)=>{
    console.error(`${err}!!!`)
    renderError(`Something went wrong......${err.message}. Try again!!`)
}).finally(()=>{
countriesContainer.style.opacity= 1;
})
}
btn.addEventListener('click',function(){
    getCountryData('portugal')
    getCountryData('dgtshl')
})
*/

//CODING CHALLENGE 1
/*
const whereAmI= function(lat,lng){
    //load geocode
fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
.then((respone)=>{
    console.log(respone)
    if(!respone.ok) throw new Error(`Problem with loading geocode (${response.status})`)
    return respone.json();
}).then((data)=>{
    console.log(`You are in ${data.city},${data.country}`)
    //render country
return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
}).then((response)=>{
    if(!respone.ok) throw new Error(`Country not found (${response.status})`)
    return respone.json();
}).then((data)=> renderCountry(data[0]))
.catch((err)=>{
    console.error(`${err}!! ${err.message}`)
    //renderError(`Something went wrong......${err.message}. Try again!!`)
})
}
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/
//EVEVNT LOOP IN PRACTISE
/*
console.log('Test starts');//global var in callback stacks are executed 1st
setTimeout(()=>console.log('0 sec timer'),0);//waits in calback queue awaiting exec in calback stack
Promise.resolve('Promise 1 resolved').then(res=>console.log(res))//gets executed in microtask queue
Promise.resolve('Promise 2 resolved').then(res=>{
for (let i=0; i<100000000; i++){}
    console.log(res)
})
console.log('Test ENDS');
*/

//BUILDING A PROMISE
//Promisifying is converting calback based asynchronous behaviour into promise based
const lotteryPromise= new Promise(function(resolve,reject){
    console.log('Lottery is happening now');
    setTimeout(()=>{
        if(Math.random()>=0.5){
            resolve('You win!!Congratulations')
        } else{
            reject(new Error('Sorry,you Lost!!Try again..'))
        }
    },2000)
})
lotteryPromise.then(res=>console.log(res)).catch(err=>console.error(err))

//Promisifying setTimeout
/*
const wait= function(seconds){
    return new Promise((resolve)=>{
        setTimeout(resolve,seconds*1000)
    })
}
wait(1).then(()=>{
    console.log('1 second passed')
    return wait(2);
}).then(()=>{
    console.log('2 seconds passed')
    return wait(3)
}).then(()=>{
    console.log('3 seconds passed')
    return wait(4)
}).then(()=>{
    console.log('4 seconds passed')
})
*/
/*
setTimeout(()=>{
    console.log('1 second passed')
    setTimeout(()=>{
        console.log('2 seconds passed')
        setTimeout(()=>{
            console.log('3 seconds passed')
            setTimeout(()=>{
                console.log('4 seconds passed')
            },1000)
        },1000)
    },1000)
},1000)
*/

//promisifying
/*
const getPosition= function(){
    return new Promise((resolve,reject)=>{
//navigator.geolocation.getCurrentPosition(position=>resolve(position),err=>reject(err))
navigator.geolocation.getCurrentPosition(resolve,reject)
console.log('Getting Position')
    })
}
*/
//getPosition().then(res=>console.log(res)).catch(err=>console.error(err))

/*
const whereAmI= function(){
    getPosition().then(pos=>{
        const{latitude:lat, longitude:lng}= pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    }).then((respone)=>{
        if(!respone.ok) throw new Error(`Problem with loading geocode (${response.status})`)
        return respone.json();
    }).then((data)=>{
        console.log(`You are in ${data.city},${data.country}`)
        //render country
    return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`)
    }).then((response)=>{
        if(!respone.ok) throw new Error(`Country not found (${response.status})`)
        return respone.json();
    }).then((data)=> renderCountry(data[0]))
    .catch((err)=>{
        console.error(`${err}!! ${err.message}`)
        //renderError(`Something went wrong......${err.message}. Try again!!`)
    })
}
btn.addEventListener('click',whereAmI)
*/

//CODING CHALLENGE 2
/*
const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  
  const imgContainer = document.querySelector('.images');
  
  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
  
      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });
  
      img.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  };
  
  let currentImg;
  
  createImage('img/img-1.jpg')
    .then(img => {
      currentImg = img;
      console.log('Image 1 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    .then(img => {
      currentImg = img;
      console.log('Image 2 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-3.jpg')
    }).then(img=>{
        currentImg=img;
        console.log('Image 3 loaded');
    })
    .catch(err => console.error(err));
  */


//CONSUMING PROMISES WITH ASYNC AWAIT
const getPosition= function(){
    return new Promise((resolve,reject)=>{
//navigator.geolocation.getCurrentPosition(position=>resolve(position),err=>reject(err))
navigator.geolocation.getCurrentPosition(resolve,reject)
    })
}

const whereAmI= async function(){
    try{
//const res=  await (`https://restcountries.eu/rest/v2/name/${country}`)
  //console.log(res)
  //Geolocation
  const pos= await getPosition()
  const{latitude:lat, longitude:lng}= pos.coords;
  //Reverse geocoding
  const resGeo=await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  if(!resGeo.ok) throw new Error(`Problem loading geocode`)
  const dataGeo=await resGeo.json();
  //Country data
  const res=await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`)
  if(!res.ok) throw new Error(`Problem loading country`)
  const data= await res.json();
 renderCountry(data[0]);
 return `You are in ${data.city},${data.country}`
 
    } catch(err){
        console.error(err)
        renderError(`Something went wrong!! (${err.message})`)
        //Reject promise returned from async fn
        throw err;
    }
  
}
console.log('1: Getting location')

whereAmI().then(city=>console.log(`2: ${city}`)).catch((err)=>console.error(`2: ${err.message}`))
.finally(()=>console.log('3: Finished getting location'))

//using async/await to return promises
/*
(async function(){
    try{
        const city= await whereAmI();
        console.log(city);
    } catch(err){
        console.error(`2: ${err.message}`)
    }
    console.log('3: Finished getting location')

})();
*/
//RUNNING PROMISES IN PARALLEL

        /*
const [data1]= await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`)
const [data2]= await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`)
const [data3]= await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
console.log([data1.capital,data2.capital,data3.capital])
prmise.all short circuits when a promise rejects
promise.race short circuts when one of the promises gets settled
promise.allsettled simply returns d results of all the promises.it never short circuits
promise.any returns d first fulfilled promise and ignores rejected promises.its similar to promise.race
but it always returns d 1st fulfilled promise and not rejected promises

*/
/*
const get3Countries= async function(c1,c2,c3){
try{
const data= await Promise.all([getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
getJSON(`https://restcountries.eu/rest/v2/name/${c2}`)],getJSON(`https://restcountries.eu/rest/v2/name/${c3}`))
console.log(data.map(cur=>cur[0].capital));
    } catch(err){
        console.error(`${err.message}`)
    }
}
get3Countries('portugal','italy','spain')
*/

/*
(async function(){
        const data= await Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/portugal`),
        getJSON(`https://restcountries.eu/rest/v2/name/spain`)],
        getJSON(`https://restcountries.eu/rest/v2/name/italy`))
        console.log(data[0]);
})

const timeout= function(s){
    return new Promise((_,reject)=>{
        setTimeout(()=>{
            reject(new Error('Request took too long'))
        },s*1000)
    })
}

Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/spain`)],timeout(1)).then(res=>console.log(res))
.catch(err=>console.error(err))
*/

//promise combinators
Promise.allSettled([Promise.resolve('SUCCESS'),Promise.reject('error'),Promise.resolve('another success')])
.then(data=>console.log(data))

Promise.all([Promise.resolve('SUCCESS'),Promise.reject('error'),Promise.resolve('another success')])
.then(data=>console.log(data)).catch(err=>console.error(err))

Promise.race([Promise.resolve('SUCCESS'),Promise.reject('error'),Promise.resolve('another success')])
.then(data=>console.log(data)).catch(err=>console.error(err))

Promise.any([Promise.resolve('SUCCESS'),Promise.reject('error'),Promise.resolve('another success')])
.then(data=>console.log(data)).catch(err=>console.error(err))