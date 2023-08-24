const burger = document.querySelector('.burger');
const nav = document.querySelector('.navi__bar');
const menuItem = document.querySelectorAll('.menu__item');
const mainHeader = document.querySelector('.main-header');
const logo = document.querySelector('.navi-logo');
const tel = document.querySelector('.tel');
const burgerBody = document.querySelector('.burger-body');
const fade = document.querySelector('.for-fade');
const body = document.querySelector('body');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const item = document.querySelector('.specialists-corousel__item');
const callbackButton = document.querySelector('.callback');
const callbackForm = document.querySelector('.clbk-1');
const callbackClose = document.querySelector('.callback__close');
const errorMessage1 = document.querySelector('.error1');
const errorMessage2 = document.querySelector('.error2');
const form = document.querySelector('.form-callback');
const thks = document.querySelector('.thks');
const thksClose = document.querySelector('.thks-close');

const addWriting = (classesArr) => {

    classesArr.forEach((item) => {
        if (document.querySelector(item)) {
            document.querySelectorAll(item).forEach((item) => item.classList.add('writing'));
        }
    });
};

addWriting(['.menu-button', '.button-price', '.buy__share', '.name__btn', '.buy__share2', '.scroll-btn']);

document.querySelectorAll('.writing').forEach((item) => {
    item.addEventListener('click', function() {
    document.location="https://wa.me/79096331515";
});
});

burger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('open');
    menuItem.forEach((item) => item.classList.toggle('mb-3'));
    mainHeader.classList.toggle('header-burger');
    logo.classList.toggle('d-none');
    tel.classList.toggle('d-none');
    burgerBody.classList.toggle('d-none');
    mainHeader.classList.toggle('position');
    fade.classList.toggle('popup-fade');
    body.classList.toggle('hidden');
});

document.addEventListener( 'click', (e) => {
    const withinBurger = e.composedPath().includes(mainHeader);
 
	if (!withinBurger) {
        burger.classList.remove('active');
		nav.classList.remove('open');
        menuItem.forEach((item) => item.classList.remove('mb-3'));
        mainHeader.classList.remove('header-burger');
        logo.classList.remove('d-none');
        tel.classList.remove('d-none');
        burgerBody.classList.add('d-none');
        mainHeader.classList.remove('position');
        fade.classList.remove('popup-fade');
        body.classList.remove('hidden');
	}
});

const itemLength = () => {
    let i;
    if (item != null) {
        i = (item.clientWidth || item.offsetWidth);
    } 
    return i;
}

const arrowScroll = () => {
    if (rightArrow != null) {
        rightArrow.addEventListener('click', () => {
            document.querySelector('.specialists-carousel').scrollBy({
                left: itemLength(),
                top: 0,
                behavior: "smooth",
            });
        });
    };
    
    if (leftArrow != null) {
        leftArrow.addEventListener('click', () => {
            document.querySelector('.specialists-carousel').scrollBy({
                left: -itemLength(),
                top: 0,
                behavior: "smooth",
            });
        });
    };
};

arrowScroll();

callbackButton.addEventListener('click', function() {
    callbackForm.style.display="flex";
    body.classList.add('hidden-callback');
});

const styleClose = () => {
    callbackForm.style.display="none";
    form.style.display="flex";
    form.reset();
    errorMessage2.style.display="none";
    errorMessage1.style.display="none";
    document.querySelectorAll('.errors')
    .forEach((el) => el.classList.remove('errors'));
    body.classList.remove('hidden-callback');
    };

callbackClose.addEventListener('click', (e) => {
    e.preventDefault();
    styleClose();
});

const closeThnks = () => {
    styleClose();
    thks.style.display="none";
    body.classList.remove('hidden-callback');
};

document.addEventListener( 'click', (e) => {
    if (!e.target.classList.contains('callback')) {
        const withinForm = e.composedPath().includes(form);
        const withinThnks = e.composedPath().includes(thks);
        if (!withinForm && !withinThnks) {
            styleClose();
        }
    }
});

const a = thksClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeThnks();
});


const inputTel = () => {
    let im = new Inputmask("+7 (999) 999-99-99");
    let inputs = document.querySelectorAll('input[type="tel"]');
    im.mask(inputs);
};

inputTel();

form.addEventListener('submit', formSend);

async function formSend(e) {
    e.preventDefault ();

    const formData = new FormData(form);
    let errors = 0;
    let response;
    const name = formData.get('name');
    const phone = formData.get('phone');


    const nameToUpperCase = (name) => {
        const firstLetter = name[0];
        const firstUpperLetter = firstLetter.toUpperCase();
        const nameWithoutFirstLetter = name.slice(1);
        return `${firstUpperLetter}${nameWithoutFirstLetter}`;
    }
 

    const validate = () => {
        const normalizePhone = phone.replace(/[^0-9]/g, '');
        if (normalizePhone.length != 11) {
            errors += 1; 
            form.elements.phone.classList.add('errors');
        } if (name.trim() == '') {
                errors += 1;
                form.elements.name.classList.add('errors');
          }
    } 

    validate();

    if (errors == 0) {
        thks.querySelector('p').innerHTML = `${nameToUpperCase(name)}, спасибо за ваше обращение! <br> Наши сотрудники уже вам звонят!`;
        form.style.display="none";
        thks.style.display="block";
        setTimeout(closeThnks, 3000);
        response = await fetch ('sendmail.php', {
            method: 'POST', 
            body: formData,
            });

    } if (errors === 1) {
        errorMessage2.style.display="none";
        errorMessage1.style.display="flex";
        form.reset();
    } if (errors > 1) {
        errorMessage1.style.display="none";
        errorMessage2.style.display="flex";
        form.reset();
    };

    form.elements.name.addEventListener('focus', function() {
        this.classList.remove('errors');
    });

    form.elements.phone.addEventListener('focus', function() {
        this.classList.remove('errors');
    });

       if (response.ok) {
            let result = await response.json(); 
            form.reset();
            console.log(result);
            }
};
