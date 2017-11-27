console.log("Hallo, ik ben de console");

var title = document.getElementById("title");
var image = document.getElementById("image");
var optie1 = document.getElementById("optie1");
var optie2 = document.getElementById("optie2");
var optie3 = document.getElementById("optie3");

var startgame = document.getElementById("startgame");

var inventorylist = document.getElementById("inventory-list");
var window = 1;
var knife = false;
var scaryperson = true;
var inventory = []

function start() {
    reset();
    show2();
    startgame.innerHTML = "Reset game";
    image.src = "img/scaryhouse.jpg";
    title.innerHTML = "Je word achtervolgd en staat voor een huis, welke keuze maak je?";
    optie1.innerHTML = "Ga het huis in."; // hunger -> true
    optie1.setAttribute('onclick', 'stairCase()');
    optie2.innerHTML = "Loop weg van het huis."; // hunger -> false
    optie2.setAttribute('onclick', 'gameOver()');
}

function stairCase() {
    show3();
    title.innerHTML = "Ga je naar boven of naar de kelder?"
    image.src = "img/trappenhuis.jpg"
    optie1.innerHTML = "Ga naar boven."
    optie1.setAttribute('onclick', 'upStairs()');
    optie2.innerHTML = "Ga naar de Kelder.";
    optie2.setAttribute('onclick', "basement()");
    optie3.innerHTML = "Ga terug naar buiten"
    optie3.setAttribute('onclick', 'start()')
}

function upStairs() {
    show3();
    title.innerHTML = "Loop je door of ga je een kamer binnen?"
    image.src = "img/gang.jpg"
    optie1.innerHTML = "Ga een kamer binnen";
    optie1.setAttribute('onclick', 'room()');
    optie2.innerHTML = "Loop door in de gang";
    optie2.setAttribute('onclick', 'windowRoom()');
    optie3.innerHTML = ('Ga terug.');
    optie3.setAttribute('onclick', 'stairCase()');
}
function windowRoom() {
    show2();
    title.innerHTML = "Wat doe je?";
    image.src = "img/window.jpg";
    optie1.innerHTML = "Kijk uit het raam.";
    optie1.setAttribute('onclick', 'lookWindow()');
    optie2.innerHTML = "Ga terug";
    optie2.setAttribute('onclick', 'upStairs()');
}
function lookWindow() {
    show1();
    title.innerHTML = "Hier is niks te zien.";
    image.src = "img/window2.jpg";
    optie1.innerHTML = "Ga terug.";
    optie1.setAttribute('onclick', 'windowRoom()');
    window++;
    if(window == 2){
        console.log("jumpscare");
    }
}
function room() {
    if(knife == true){
        show1();
        title.innerHTML = "Een dood gewone kamer.";
        image.src = "img/room.jpg";
        optie1.innerHTML = "Ga terug.";
        optie1.setAttribute('onclick', 'upStairs()');
    }else{
        show2();
        title.innerHTML = "Je ziet een mes liggen, misschien komt het van pas?";
        image.src = "img/room.jpg";
        optie1.innerHTML = "Pak het mes op."
        optie1.setAttribute('onclick', 'pickupKnife()');
        optie2.innerHTML = "Ga terug.";
        optie2.setAttribute('onclick', "upStairs()");
    }
}
function pickupKnife() {
    pushItem("knife");
    knife = true;
    room();
}
function basement() {
    if(scaryperson == true){
        show2();
        title.innerHTML = "Je wilt langs dit enge persoon, wat doe je?";
        image.src = "img/scaryhallway.jpg";
        optie1.innerHTML = "vermoord de persoon";
        optie1.setAttribute('onclick', 'killScaryPerson()');
        optie2.innerHTML = "ga terug";
        optie2.setAttribute('onclick', 'stairCase()');
    } else {
        basement2();
    }
}
function basement2() {
    show2();
    title.innerHTML = "Het enge persoon is neergestoken.";
    image.src = "img/basement2.jpg";
    optie1.innerHTML = "Loop verder de kelder in.";
    optie1.setAttribute('onclick', 'basement3()');
    optie2.innerHTML = "Ga terug.";
    optie2.setAttribute('onclick', 'stairCase()');
}
function basement3() {
    show3();
    title.innerHTML = "Wat doe je?";
    image.src = "img/basement3.jpg";
    optie1.innerHTML = "Ga in de tunnel";
    optie1.setAttribute('onclick', 'enterTunnel()');
    optie1.innerHTML = "Ga de kast in.";
    optie1.setAttribute('onclick', 'enterCloset()');
    optie1.innerHTML = "Ga terug.";
    optie3.setAttribute('onclick', 'basement2()');
}

function killScaryPerson() {
    if(knife == true){
        scaryperson = false;
        basement2();
    } else {
        gameOver();
    }
}

function gameOver() {
    reset();
    image.src="img/gameover.png";
    title.innerHTML = "Je bent dood, start overnieuw.";
    optie1.innerHTML = "Start overnieuw";
    optie1.setAttribute('onclick', 'start()');
    optie2.style = 'list-style-type: none;'
    optie2.style.display = "none";
    optie3.style.display = "none";
}
function reset() {
    inventory = [];
    loadInventory();
    window = 0;
    scaryperson = true;
    knife = false;
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
