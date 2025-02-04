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
        item.querySelector(".header__menu-link").classList.remove("header__menu-link_selected")
    })
    // Добавляю модификатор "selected" выбранному элементу
    target.classList.add("header__menu-item_selected")
    target.querySelector(".header__menu-link").classList.add("header__menu-link_selected")
}

// Создаю обработчик на все элементы меню в header
headerMenuList.addEventListener("click", function(event) {
    updateHeaderMenuSelectedItem(event)
})

