const request =  require('request');

const weather = (log , lat , callback)=>{
    const url = 
    "https://api.darksky.net/forecast/5c48a1cfce7069c2313b5509cea93fed/"+log+","+lat;
    request({url, json:true},(e,{body})=>{
        callback(undefined,body)
    })
};
module.exports = weather;