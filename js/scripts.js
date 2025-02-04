'use strict';

const headerMenuList = document.querySelector(".header__menu-list")
const headerMenuItem = document.querySelectorAll(".header__menu-item")

// Функция для переключения стиля у кнопок навигации в header
headerMenuList.addEventListener("click", function(e) {
    const target = e.target.closest(".header__menu-item")
    if (!target) return    // Если клик был вне контейнера с ссылкой, то игнор
    if (target.classList.contains("header__menu-link_selected")) return   // Если выбранный элемент навигации уже был ранее выбран (есть модификатор "selected"), то игнор
    
    // Перебираю все элементы навигации у удаляю у них класс-модификатор "selected" (если он до этого был)
    headerMenuItem.forEach(function(item) {
        item.classList.remove("header__menu-item_selected")
        item.querySelector(".header__menu-link").classList.remove("header__menu-link_selected")
    })
    // Добавляю модификатор "selected" выбранному элементу
    target.classList.add("header__menu-item_selected")
    target.querySelector(".header__menu-link").classList.add("header__menu-link_selected")
})