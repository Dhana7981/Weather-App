var weatherInfoObj={};
window.addEventListener('load',(event)=>{
    var lat,long;
    var country,locationName,timeZone,locationKey;
    //var weatherInfoObj={};
    var apiKey='B7dSzezruyCPVM7Qy044PQGM90lRxK1w';
    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(position)
        lat=position['coords']['latitude']
        long=position['coords']['longitude']
        console.log(lat+" "+long)
        var geoLocationUrl=`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`;
        //console.log(geoLocationUrl)
        axios.get(geoLocationUrl).then((response)=>{
        console.log(response)
        // country=response.data.Country.EnglishName
        // response.data.TimeZone=response.data.Key
        // locationName=response.data.LocalizedName
        // timeZone=response.data.TimeZone
        // console.log(country+" "+response.data.TimeZone+" "+locationName+" "+timeZone)
        weatherInfoObj['country']=response.data.Country.EnglishName
        weatherInfoObj['locationKey']=response.data.Key
        weatherInfoObj['locationName']=response.data.LocalizedName
        weatherInfoObj['timeZone']=response.data.TimeZone
        console.log(weatherInfoObj)
        getWeatherdata(apiKey,weatherInfoObj.locationKey)
       
       })
    })
})

function getWeatherdata(apiKey,LocationKey){
    //var weatherInfoObj={};
    var weatherUrl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LocationKey}?apikey=${apiKey}`;
    axios.get(weatherUrl).then((response)=>{
        console.log(response);
        weatherInfoObj['today']=response.data.DailyForecasts[0].Date
        weatherInfoObj['day']=response.data.DailyForecasts[0].Day
        weatherInfoObj['night']=response.data.DailyForecasts[0].Night
        weatherInfoObj['temparature']=response.data.DailyForecasts[0].Temperature
        console.log("dhana",weatherInfoObj)

        var today =new Date(weatherInfoObj['today'])

        returnId('country').textContent=weatherInfoObj['country']
        returnId('currentLocation').textContent=weatherInfoObj['locationName']
        returnId('date').textContent=today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+weatherInfoObj.timeZone.Code
        if(weatherInfoObj.day.Icon<10){
            returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObj.day.Icon}-s.png`)
        }else{
            returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObj.day.Icon}-s.png`)
        }
        if(weatherInfoObj.night.Icon<10){
            returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherInfoObj.night.Icon}-s.png`)
        }else{
            returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherInfoObj.night.Icon}-s.png`)
        }
        returnId('morning-desc').textContent=weatherInfoObj.day.IconPhrase
        returnId('night-desc').textContent=weatherInfoObj.night.IconPhrase
    })
}

function returnId(id){
    return document.getElementById(id)
}