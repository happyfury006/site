const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const changeLanguage = document.querySelector('.LanguageSelector');
const PoliceAurebesh = document.querySelector('.PoliceAurebesh');
const PoliceAurebesh2 = document.querySelector('.PoliceAurebesh2');
var choixPolice=0;

registerLink.addEventListener('click',()=> {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
});
changeLanguage.addEventListener('click',()=> {

    choixPolice = choixPolice +1;
    choixPolice=choixPolice%2;
    switch (choixPolice) {
        case 0:
            PoliceAurebesh.classList.add('active');
            PoliceAurebesh2.classList.remove('active');
            break;
        case 1:
            PoliceAurebesh2.classList.add('active');
            PoliceAurebesh.classList.remove('active');
            break;
        default:
            break;
    }
});
