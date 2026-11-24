const Menuplanet = document.querySelector('.Menu-planet-button-navbar');
const boxplanets = document.querySelector('.boxplanets');
const box = document.querySelector('.box');
const Corrusant = document.querySelector('.Corrusant');
const Naboo = document.querySelector('.Naboo');
const Scariff = document.querySelector('.Scariff');
const Dathomir = document.querySelector('.Dathomir');
const ListePlanete = [Corrusant,Naboo,Scariff,Dathomir];
const EtatSwitch=false;




/* Definition des différentes utilisé pour réaliser 
le système interactif du menu de navigation*/

// function showbox(nombox){
//     nombox.classList.remove('active')
// };

// function shadowing(nombox){
//     nombox.classList.add('active')
    
// };

// function openmenu(){
//     boxplanets.classList.remove('active');
//     for (let index = 0; index < ListePlanete.length; index++) {
//         setTimeout(showbox(ListePlanete[index]),1000);
//     }
// };

// function closemenu(){
//     boxplanets.classList.add('active');
//     for (let index = ListePlanete.length; index > 0; index--) {
//         setTimeout(shadowing(ListePlanete[index]),1000);
//     }    
// };

function openmenu(){
    boxplanets.classList.remove('invisble');
    boxplanets.classList.add('active');
    setTimeout(box.Corrusant.classList.remove('invisible'),1000);
    box.Corrusant.classList.add('active');
    setTimeout(box.Naboo.classList.add('invisible'),1000);
    box.Naboo.classList.add('active');
    setTimeout(box.Scariff.classList.add('invisible'),1000);
    box.Scariff.classList.add('active');
    setTimeout(box.Dathomir.classList.add('invisible'),1000);
    box.Dathomir.classList.add('active');
};

function closemenu(){
    setTimeout(box.Dathomir.classList.remove('active'),1000);
    box.Dathomir.classList.add('invisible');
    setTimeout(box.Scariff.classList.add('active'),1000);
    box.Scariff.classList.add('invisible');
    setTimeout(box.Naboo.classList.add('active'),1000);
    box.Naboo.classList.add('invisible');
    setTimeout(box.Corrusant.classList.add('active'),1000);
    box.Corrusant.classList.add('invisible');
    setTimeout(boxplanets.classList.remove('active'),1000);
    boxplanets.classList.add('invisible');
   
};
/* déroulement du fonctionement du menu */

Menuplanet.addEventListener('click', () => {
    if (EtatSwitch === false) {
        openmenu();
    } else {
        closemenu();
    }
    EtatSwitch = !EtatSwitch;
    console.log(EtatSwitch);
});



