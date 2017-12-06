//HTML Elements
var title = document.getElementById("title");
var intro = document.getElementById("intro");
var optie1 = document.getElementById("optie1");
var optie2 = document.getElementById("optie2");
var optie3 = document.getElementById("optie3");
var music = document.getElementById("musicplayer");
var audio = document.getElementById("audioplayer");

//Inventory / Items
var inventorylist = document.getElementById("inventory-list");
var slagersmes = document.getElementById("slagersmes");
var sleutelimg = document.getElementById("sleutel-foto");
var jumpscare = document.getElementById("jumpscare");

//Data=
var scare = 0;
var scared = false;
var scaryperson = true;
var inventory = [];

//Music player
music.volume = 0.05;

function start() {
    if(document.getElementById("volume").className === "fa fa-volume-up fa-4x"){
        music.volume = 0.05;
    }
    music.src = "bestanden/creepy-music.mp3";
    document.getElementById("inventory").style.display = "inline-block";
    reset();
    outside();
    intro.style.display = "inline";
}
function outside() {
    show2();
    document.body.style.backgroundImage = 'url("img/scaryhouse.jpg")';
    title.innerHTML = "Buiten het huis";
    intro.innerHTML = "Je word achtervolgd en staat voor een huis, misschien kan je daar ontsnappen?"
    optie1.innerHTML = "Ga het huis in."; // hunger -> true
    optie1.setAttribute('onclick', 'audio.src = "bestanden/creakdoor.mp3" ,stairCase()');
    optie2.innerHTML = "Loop weg van het huis."; // hunger -> false
    optie2.setAttribute('onclick', "intro.innerHTML = 'Je word gepakt en overleeft de aanval niet.', gameOver()");
    console.log(title.innerHTML);
}

function stairCase() {
    show3();
    title.innerHTML = "Trappenhuis";
    intro.innerHTML = "Waar ga je heen?"
    document.body.style.backgroundImage = 'url("img/trappenhuis.jpg")';
    optie1.innerHTML = "Ga naar boven.";
    optie1.setAttribute('onclick', 'audio.src = "bestanden/stairs.mp3", upStairs()');
    optie2.innerHTML = "Ga naar de Kelder.";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/stairs.mp3", basement()');
    optie3.innerHTML = "Ga terug naar buiten";
    optie3.setAttribute('onclick', 'audio.src = "bestanden/creakdoor.mp3", outside()');
    console.log(title.innerHTML);
}

function upStairs() {
    show3();
    title.innerHTML = "De gang";
    intro.innerHTML = "Wat ga je doen?";
    document.body.style.backgroundImage = 'url("img/gang.jpg")';
    optie1.innerHTML = "Ga een kamer binnen";
    optie1.setAttribute('onclick', 'audio.src = "bestanden/dooropen.mp3", room()');
    optie2.innerHTML = "Loop door in de gang";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/walking.mp3", windowRoom()');
    optie3.innerHTML = ('Ga terug.');
    optie3.setAttribute('onclick', 'audio.src = "bestanden/stairs.mp3", stairCase()');
    console.log(title.innerHTML);
}
function windowRoom() {
    audio.src = "bestanden/walking.mp3";
    show2();
    title.innerHTML = "Raam";
    intro.innerHTML = "Durf je uit het raam te kijken?"
    document.body.style.backgroundImage = 'url("img/window.jpg")';
    optie1.innerHTML = "Kijk uit het raam.";
    optie1.setAttribute('onclick', 'audio.src = "bestanden/thunder.mp3", lookWindow()');
    optie2.innerHTML = "Ga terug";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/walking.mp3", upStairs()');
    console.log(title.innerHTML);
}
function lookWindow() {
    show1();
    title.innerHTML = "Raam";
    intro.innerHTML = "Ik zie nog niks.";
    document.body.style.backgroundImage = 'url("img/window2.jpg")';
    optie1.innerHTML = "Ga terug.";
    optie1.setAttribute('onclick', "audio.src = 'bestanden/walking.mp3', jumpscare.style.display='none', windowRoom()");
    scare++;
    //jumpscare
    if(scare === 2){
        jumpscare.style.display = "block";
        audio.src = "bestanden/scream.mp3";
        intro.innerHTML = "Wat is dit dan?"
        scared = true;
        pushItem("Angst poepje");
    }
    console.log(title.innerHTML);
}
function room() {
    show1();
    title.innerHTML = "De kamer";
    optie1.innerHTML = "Ga terug.";
    optie1.setAttribute('onclick', "audio.src = 'bestanden/dooropen.mp3', slagersmes.style.display = 'none', upStairs()");
    document.body.style.backgroundImage = 'url("img/room.jpg")';
    if(inventoryContains("Mes")){
        intro.innerHTML = "Een dood gewone kamer.";
    }else{
        slagersmes.style.display = "block";
        intro.innerHTML = "Je ziet een mes liggen, misschien komt het van pas?";
    }
    console.log(title.innerHTML);
}
function pickupKnife() {
    slagersmes.style.display = "none";
    pushItem("Mes");
    show1();
    optie1.innerHTML = "Ga terug.";
    optie1.setAttribute('onclick', 'upStairs()');
    intro.innerHTML = "Een dood gewone kamer.";
    console.log(title.innerHTML);
}
function basement() {
    title.innerHTML = "Kelder";
    if(scaryperson == true){
        show2();
        intro.innerHTML = "Er staat een monster in je weg.";
        document.body.style.backgroundImage = 'url("img/scaryhallway.jpg")';
        optie1.innerHTML = "vermoord het monster";
        optie1.setAttribute('onclick', 'audio.src = "bestanden/stab.mp3", killScaryPerson()');
        optie2.innerHTML = "Ga terug.";
        optie2.setAttribute('onclick', 'audio.src = "bestanden/stairs.mp3", stairCase()');
    } else {
        basement2();
    }
    console.log(title.innerHTML);
}
function killScaryPerson() {
    if(inventoryContains("Mes")){
        scaryperson = false;
        basement2();
    } else {
        gameOver();
        intro.innerHTML = "Misschien moet je volgende keer naar een wapen zoeken."
    }
}
function basement2() {
    show2();
    intro.innerHTML = "Het monster is vermoord en je weg is vrij.";
    document.body.style.backgroundImage = 'url("img/basement2.jpg")';
    optie1.innerHTML = "Loop verder de kelder in.";
    optie1.setAttribute('onclick', 'audio.src = "bestanden/walking.mp3", basement3()');
    optie2.innerHTML = "Ga terug.";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/stairs.mp3", stairCase()');
    console.log(title.innerHTML);
}
function basement3() {
    show3();
    intro.innerHTML = "Wat doe je?";
    document.body.style.backgroundImage = 'url("img/basement3.jpg")';
    optie1.innerHTML = "Ga in de kamer";
    optie1.setAttribute('onclick', 'checkKey()');
    optie2.innerHTML = "Ga de kast in.";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/dooropen.mp3", enterCloset()');
    optie3.innerHTML = "Ga terug.";
    optie3.setAttribute('onclick', 'audio.src = "bestanden/walking.mp3", basement2()');
    console.log(title.innerHTML);
}
function checkKey() {
    if(inventoryContains("Sleutel")){
        audio.src = "bestanden/Metal_Door.mp3";
        enterJail();
    } else {
        audio.src = "bestanden/locked.mp3";
        intro.innerHTML = "Je heb niet de vereiste sleutel!";
    }
}
function enterJail() {
    show2();
    title.innerHTML = "Gevangeniscel";
    intro.innerHTML = "Er zit een gat in de muur! Kan dit je ontsnapping zijn?";
    document.body.style.backgroundImage = 'url("img/jailcell.jpg")';
    optie1.innerHTML = "Ga in de tunnel";
    optie1.setAttribute('onclick', 'audio.src = "bestanden/walking.mp3", enterTunnel()');
    optie2.innerHTML = "Ga terug";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/Metal_Door.mp3", basement3()');
    console.log(title.innerHTML);
}
function enterTunnel() {
    show2();
    audio.src = "bestanden/Hallow_Wind.mp3"
    document.body.style.backgroundImage = 'url("img/tunnel.jpg")';
    intro.innerHTML = "Je ziet licht, wat doe je?"
    title.innerHTML = "Tunnel"
    optie1.innerHTML = "Ga verder richting het licht.";
    optie1.setAttribute('onclick', 'freedom()');
    optie2.innerHTML = "Ga terug";
    optie2.setAttribute('onclick', 'audio.src = "bestanden/walking.mp3", enterJail()');
    console.log(title.innerHTML);
}
function freedom() {
    music.src = "bestanden/megabber.mp3"
    audio.src = "";
    show1();
    document.body.style.backgroundImage = 'url("img/survived.jpg")';
    title.innerHTML = "Overwinning"
    intro.innerHTML = "Je hebt het overleefd!";
    optie1.innerHTML = "Speel overnieuw!";
    optie1.setAttribute('onclick', 'start()');
    console.log(title.innerHTML);
}
function enterCloset() {
    title.innerHTML = "De kast";
    document.body.style.backgroundImage = 'url("img/closet.jpg")';
    optie1.innerHTML = "Ga de kast uit.";
    show1();
    optie1.setAttribute('onclick', 'audio.src = "bestanden/dooropen.mp3", sleutelimg.style.display = "none", basement3()');
    if (inventoryContains("Sleutel")) {
        intro.innerHTML = "Een gewone kast.";
    } else  {
        sleutelimg.style.display = "block";
        intro.innerHTML = "Er hangt een sleutel in de kast";
    }
    console.log(title.innerHTML);
}
function pickupKey(){
    intro.innerHTML = "Een gewone kast.";
    pushItem("Sleutel");
    show1();
    sleutelimg.style.display = "none";
}

function gameOver() {
    if(document.getElementById("volume").className === "fa fa-volume-up fa-4x"){
        music.volume = 0.5;
    }
    audio.src = ""
    music.src = "bestanden/gameover.mp3"
    show1();
    document.body.style.backgroundImage = 'url("img/gameover.png")';
    title.innerHTML = "Game over!";
    optie1.innerHTML = "Start overnieuw";
    optie1.setAttribute('onclick', 'start()');
    optie2.style = 'list-style-type: none;'
    console.log(title.innerHTML);
}
function changeVolume(){
    var volumeclass = document.getElementById("volume").className;
    if(volumeclass === "fa fa-volume-up fa-4x"){
        volumeclass = "fa fa-volume-off fa-4x";
        document.getElementById("volume").className = volumeclass;
        audio.volume = 0;
        music.volume = 0;
        console.log(volumeclass);
    }else if(volumeclass === "fa fa-volume-off fa-4x"){
        volumeclass = "fa fa-volume-up fa-4x";
        document.getElementById("volume").className = volumeclass;
        audio.volume = 0.5;
        music.volume = 0.05;
        console.log(volumeclass);
    }
}
function reset() {
    inventory = [];
    loadInventory();
    scare = 0;
    scared = false;
    scaryperson = true;
    document.getElementById("startbutton").style.display = "none";
    audio.src = "";
}
function inventoryContains(name) {
    var result = false;
    var invlength = inventory.length;
    for(cijfer = 0; cijfer < invlength; cijfer++) {
        console.log(inventory[cijfer]);
        if(inventory[cijfer] == name){
            result = true;
            break;
        }
    }
    return result;
    console.log(result);
}
function show1() {
    optie1.style.display = "inline-block";
    optie2.style.display = "none";
    optie3.style.display = "none";
}
function show2() {
    optie1.style.display = "inline-block";
    optie2.style.display = "inline-block";
    optie3.style.display = "none";
}
function show3() {
    optie1.style.display = "inline-block";
    optie2.style.display = "inline-block";
    optie3.style.display = "inline-block";
}
function pushItem(String) {
    inventory.push(String);
    loadInventory();
}
function loadInventory() {
    inventorylist.innerHTML = inventory;
}
function refresh() {
    location.reload();
}
