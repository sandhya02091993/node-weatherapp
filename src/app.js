const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geo = require('../src/util/geocode');
const weather = require('../src/util/weather');
console.log(__dirname)
const publicdirectory = path.join(__dirname,'../public');
const viewDirectory = path.join(__dirname, '../templates/views');
const partialDirectory = path.join(__dirname, '../templates/partials');

console.log(publicdirectory);
var app = express();


//setting up the dynamic view
app.set('view engine', 'hbs');
app.set('views',viewDirectory);
hbs.registerPartials(partialDirectory);

//setting up the static directory
app.use(express.static(publicdirectory));

app.get('',(req, res)=>{
    res.render('index',{
        title:'home',
        about:'weather app'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'about',
        about: 'additional info'
    })
})


app.get('/help',(req, res)=>{
    res.render('help', {
        title: 'help',
        about: 'help content'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
       return res.send('address is required')
    }
    geo(req.query.address,(e, d)=>{
        if(e)
        {
            return res.send({e});
        }
        weather(d.log,d.lat, (e,{daily}={})=>{
        if(e)
        {
            return res.send({e});
        }
        res.send({location:req.query.address ,forecast: daily.summary});
        });
    });  
});
app.get('/help/*',(req, res)=>
{
    res.render('error',{
        title: '404',
        errorText: 'no help content found'
    })
})

app.get('*',(req, res)=>
{
    res.render('error',
    {
        title: '404',
        errorText: 'page not found'
    })

})

app.listen(80, ()=>{
    console.log("3000 port");
})