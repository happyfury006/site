const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const changeLanguage = document.querySelector('.LanguageSelector')
const Police = document.querySelector('.PoliceAurebesh')

registerLink.addEventListener('click',()=> {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
});
changeLanguage.addEventListener('click',()=> {
    Police.classList.add('active');
});
