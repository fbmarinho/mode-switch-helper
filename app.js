
var timer = null;

async function start(){
    disable();
    await preparar();
    await pumps();
}

function getInputValue(id){
    return parseInt(document.getElementById(id).value);
}

function reset(){
    enable();
    setDisplay("MODE SWITCH")
    setTimeDisplay("Desligue as bombas e inicie");
    clearInterval(timer);
}

function setDisplay(text, color = "#000", bg="#ddd"){
    const display = document.getElementById('display');
    display.innerText = text;
    display.style.color = color;
    display.style.backgroundColor = bg;
}

function setTimeDisplay(text){
    const timer = document.getElementById('timer');
    timer.innerText = text;
}

async function preparar(){
    setDisplay("PREPARAR", "black", "yellow")
    await countdown(getInputValue('preparar'));
}
async function pumps(){
    for(let i = 0; i<getInputValue('vezes'); i++){
        setDisplay("PUMPS ON", "white", "green")
        await countdown(getInputValue('intervalo'));
        setDisplay("PUMPS OFF", "white", "red")
        await countdown(getInputValue('intervalo'));
    }
    setDisplay("CICLAR BOMBAS", "black", "yellow");
    setTimeDisplay("");
}


async function countdown(t){
    setTimeDisplay(t)
    for (let i = t-1; i > 0; i--) {
        await delay(1000).then(() => setTimeDisplay(i));
    }
}

function delay(time) {
    return new Promise(resolve => timer = setTimeout(resolve, time));
}

function disable(){
    document.getElementById('preparar').setAttribute('disabled',true);
    document.getElementById('intervalo').setAttribute('disabled',true);
    document.getElementById('vezes').setAttribute('disabled',true);
    document.getElementById('start').setAttribute('disabled',true);
    document.getElementById('start').style.display = 'none';
    document.getElementById('reset').removeAttribute('disabled');
    document.getElementById('reset').style.display = 'block';
}

function enable(){
    document.getElementById('preparar').removeAttribute('disabled');
    document.getElementById('intervalo').removeAttribute('disabled');
    document.getElementById('vezes').removeAttribute('disabled');
    document.getElementById('start').removeAttribute('disabled');
    document.getElementById('start').style.display = 'block';
    document.getElementById('reset').setAttribute('disabled',true);
    document.getElementById('reset').style.display = 'none';
}
enable();

function saveValue(el){
    console.log(e)
}

HTMLCollection.prototype.forEach = Array.prototype.forEach;

document.getElementsByTagName('input').forEach((el)=>{
    el.addEventListener('change',(e)=>{
        console.log(e.target.id, e.target.value);
        localStorage.setItem(e.target.id, e.target.value);
    })
})

document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM Ready");
    document.getElementById('preparar').value = localStorage.getItem('preparar') || 20;
    document.getElementById('intervalo').value = localStorage.getItem('intervalo') || 45;
    document.getElementById('vezes').value = localStorage.getItem('vezes') || 2;
})