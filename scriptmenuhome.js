const Menuplanet = document.querySelector('.Menu-planet-button-navbar');
const boxplanet = document.querySelector('.boxplanets');
const Box = document.querySelector('.box');
const Corrusant = document.querySelector('.Corrusant');
const Naboo = document.querySelector('.Naboo');
const Scariff = document.querySelector('.Scariff');
const Dathomir = document.querySelector('.Dathomir');
const ListePlanete = [Corrusant,Naboo,Scariff,Dathomir];

// Box.classList.add('invisble');

function showbox(nombox){
    nombox.classList.remove('invisble')
};

function shadowing(nombox){
    nombox.classList.add('invisible')
};

function intilisation(){
    box.classList.add('invisble');
    for (let index = 0; index < ListePlanete.length; index++) {
        shadowing(ListePlanete[index]);
    }


};

function openmenu(){
    boxplanet.classList.remove('invisble');
    for (let index = 0; index < ListePlanete.length; index++) {
        setTimeout(showbox(ListePlanete[index]),200);
    }
    //ajouter un par un les blcos que l'on veut afficher et on fera le processus inverse pour faire disparaitre le menu

};

function closemenu(){
    boxplanet.classList.add('invisble');
    for (let index = ListePlanete.length; index > 0; index--) {
        setTimeout(shadowing(ListePlanete[index]),100);
    }
    //ajouter un par un les blcos que l'on veut afficher et on fera le processus inverse pour faire disparaitre le menu
    
};


Menuplanet.addEventListener('click',()=> {
    openmenu();
})