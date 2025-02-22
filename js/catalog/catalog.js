'use strict';


const headerMenuList = document.querySelector(".header__menu-list")
const headerMenuItem = document.querySelectorAll(".header__menu-item")

const headerDropdownBtn = document.querySelector(".header__dropdown-btn")       // Кнопка для раскрытия "бургер-меню"
const headerDropdownList = document.querySelector(".header__dropdown-list")     // Список со скрытыми элементами навигации при нажатии на кнопку раскрытия "бургер-меню"
const burgerCheckbox = document.querySelector(".burger-checkbox")               // Инпут в бургер-меню (для изменения состояния кнопки)

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

    // Если скрытый список у "бургер-меню" показан, то скрываю его и убираю отметку с инпута (о том, что он был выбран) (меняю крестик на 3 полоски)
    if (!headerDropdownList.classList.contains("hidden-by-display")) {
        headerDropdownList.classList.add("hidden-by-display")
        burgerCheckbox.checked = false;
    }
}

// Создаю обработчик на все элементы меню в header
headerMenuList.addEventListener("click", function(event) {
    updateHeaderMenuSelectedItem(event)
})
headerDropdownList.addEventListener("click", function(event) {
    updateHeaderMenuSelectedItem(event)
})




// При клике на бургер-меню (в телефонной версии)
headerDropdownBtn.addEventListener("click", function(e) {
    headerDropdownList.classList.toggle("hidden-by-display")
})