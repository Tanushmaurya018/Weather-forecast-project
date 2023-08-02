const input = document.getElementById("input-data");
const search = document.getElementById("search");
const countryname = document.getElementById("country-name");
const cityname = document.getElementById("city-name");
const time = document.getElementById("time");
const temperature = document.getElementById("temp");
const locationbtn = document.getElementById("location-btn");

async function getData(lat,lon){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=7a2a4898baf34471ac6105109232407&q=${lat},${lon}&aqi=yes`);
    return await promise.json();
}

async function getlocation(position){
    const autoresult = await getData(position.coords.latitude,position.coords.longitude);
    console.log(autoresult);
    countryname.innerText=`Country : ${autoresult.location.country}`;
    cityname.innerText=`Name : ${autoresult.location.name}`;
    temp.innerHTML=`Temperature: ${autoresult.current.temp_c + " °C"}`;
    time.innerHTML=`Date and Time : ${autoresult.location.localtime}`;
    input.innerText=`${autoresult.location.name}`;
}

function failToGet(){
    console.log("Location wasn't detected");
}

locationbtn.addEventListener("click",async()=>{
    navigator.geolocation.getCurrentPosition(getlocation,failToGet);
});

search.addEventListener("click",async () => {
    const value = input.value;
    const inputresult = await getData(value);

    console.log(inputresult);
    countryname.innerText=`Country : ${inputresult.location.country}`;
    cityname.innerText=`Name : ${inputresult.location.name}`;
    temp.innerHTML=`Temperature: ${inputresult.current.temp_c + " °C"}`;
    time.innerHTML=`Date and Time : ${inputresult.location.localtime}`;

})