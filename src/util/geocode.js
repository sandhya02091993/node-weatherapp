const request =  require('request');
const getGeoCode =(location, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+
    encodeURIComponent(location)+ ".json?access_token=pk.eyJ1Ijoic2FuZGh5YTkzMiIsImEiOiJjazNlaGx4Y3QxZnlvM3BzMWNwOGgzNnlpIn0.4upT2YnzxmaKFEpAZd-GyA";
    request({url, json:true},(error,{body})=>
    {
    if(error)
    {
        callback("error", undefined);
    }
    else if(body.features.length === 0){
        callback("no data found", undefined);
            }
    else{
        callback(null,{lat: body.features[0].center[0], log: body.features[0].center[1]});
    }
})
}

module.exports = getGeoCode;