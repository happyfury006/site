const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginNB = document.querySelector('.login-button-navbar');
const SWintro= document.querySelector('.star-wars-intro');
const btnaudio= document.querySelector('.btnaudio');
const audio = document.querySelector('Intromusic');


wrapper.classList.add('invisible');
// setTimeout(audio.play(),2000);
// audio.play();
function vanishing(){
    wrapper.classList.remove('invisible');
    SWintro.classList.add('invisible');
    // audio.pause();
    // audio.currentTime = 0;
};

loginNB.addEventListener('click',()=>{
     vanishing();
});
registerLink.addEventListener('click',()=> {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
});

setTimeout(vanishing,30000);//delai de 20s
