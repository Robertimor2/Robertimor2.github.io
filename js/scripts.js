'use strict';

const headerMenuList = document.querySelector(".header__menu-list")
const headerMenuItem = document.querySelectorAll(".header__menu-item")


// Функция для переключения стиля у кнопок навигации в header
const updateHeaderMenuSelectedItem = function(e) {
    const target = e.target.closest(".header__menu-item")
     // Если клик был вне контейнера с ссылкой, то игнор. И если выбранный элемент навигации уже был ранее выбран (есть модификатор "selected") 
    if (!target || target.classList.contains("header__menu-link_selected")) return   
    
    // Перебираю все элементы навигации у удаляю у них класс-модификатор "selected" (если он до этого был)
    headerMenuItem.forEach(function(item) {
        item.classList.remove("header__menu-item_selected")
    })
    // Добавляю модификатор "selected" выбранному элементу
    target.classList.add("header__menu-item_selected")
}

// Создаю обработчик на все элементы меню в header
headerMenuList.addEventListener("click", function(event) {
    updateHeaderMenuSelectedItem(event)
})



document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.querySelector('.slider__bar-range');
    const beforeImage = document.querySelector('.slider__cat-before-img');
    const afterImage = document.querySelector('.slider__cat-after-img');
    console.log(rangeInput);
    rangeInput.addEventListener('input', () => {
        console.log("123");
        //value от 0 до 100
        const value = rangeInput.value;
        //режет справа фото толстого кота на значение ползунка, чем больше тянешь влево, тем больше показывается фото кота
        beforeImage.style.clipPath = `inset(0 ${value}% 0 0)`;
        //режет слева фото худого кота, 100 и значение ползунка, получается чем больше тянешь вправо, тем меньше обрезки
        afterImage.style.clipPath = `inset(0 0 0 ${100 - value}%)`;
    });
});
