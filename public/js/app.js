console.log("sandya");


const form = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#location');
const p2 = document.querySelector('#prediction');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    p1.textContent = "loading.....";
    p2.textContent = "";
    fetch("/weather?address="+search.value).then((Response)=>{
        Response.json().then((data)=>{
        if(data.e)
        {
            p1.textContent = data.e;
        }
        else{
            p1.textContent = data.forecast;
            p2.textContent = data.location;
        }
        })
        })
})