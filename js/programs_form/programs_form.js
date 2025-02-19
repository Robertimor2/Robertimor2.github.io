'use strict';


// < Функции для валидации поля с номером телефона.......
function setCursorPosition(pos, e) {
    if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    else if (e.createTextRange) {
      let range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask(e) {
    let matrix = this.placeholder, // .defaultValue
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
      return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this)
  }
  window.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector("#telephone");
    input.addEventListener("input", mask, false);
    // input.focus();
    setCursorPosition(3, input);
  });

  // ... Функции для валидации поля с номером телефона />



  

const mainDoc = document.querySelector("main")
const form = document.querySelector('.additional__form')
const inputList = Array.from(mainDoc.querySelectorAll('.form-field-container__type-input'))
const buttonElement = mainDoc.querySelector('.additional__button')
const formErrorElement = mainDoc.querySelector('.additional__empty-error')





// Функция startValidation() инициирует процесс валидации. Она добавляет обработчик событий для всей формы на событие submit, где используется event.preventDefault() для предотвращения стандартного поведения формы при отправке. Для дополнительной информации читайте «Работа с формами».
// На каждое поле ввода назначаются обработчики событий input, blur и focus. При любых изменениях в полях ввода активируются функции checkInputValidity() и toggleButton(). При потере фокуса активируется функция toggleInputError(), а при установке фокуса сбрасывается сообщение об ошибке с помощью toggleErrorSpan().
// Для чекбокса добавим отдельный обработчик change, при срабатывании такого события вызовутся функции toggleInputError() и toggleButton().

// Вызываем функцию
startValidation()

function startValidation() {
    toggleButton()
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        // Показываем ошибку
        if (hasInvalidInput()) {
            formError()
            inputList.forEach((inputElement) => {
                checkInputValidity(inputElement)
                toggleInputError(inputElement)
            })
        }
    })
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement)
            toggleButton()
        })
        inputElement.addEventListener('blur', () => {
            toggleInputError(inputElement)
        })
        inputElement.addEventListener('focus', () => {
            toggleErrorSpan(inputElement)
        })
    })
}

// let a = "+"
// let b = 2
// let res = a + 1
// console.log(res);
// console.log(typeof res);
// console.log(Number(res));
// console.log("_", Number("_"));
// console.log(typeof Number("_"));

// let n1 = Number("_")
// console.log(Number("_") == NaN);
// console.log(Number("5") == NaN);
// if (Number(a)) {
//     console.log(`${a} это число`);
// } 
// else if (!Number(a)) {
//     console.log(`${a} это НЕ число`);
// }
// Сначала проверяется задан ли для поля ввода определённый паттерн и установлена ли минимальная длина. Если паттерн задан и не совпадает с введёнными данными, то с помощью функции setCustomValidity передаётся кастомное сообщение об ошибке, хранящееся в атрибуте data-error-message. В случае соответствия введённых данных паттерну, с помощью функции checkLengthMismatch() также проверяется длина введённых данных, очищенная от пробелов. Если сообщение больше установленного количества символов и не пустое, то сообщение об ошибке не передаётся, в ином случае — пользователь получает сообщение с минимально необходимым количеством символов.
// В функции toggleInputError() реализована стандартная проверка: если свойство input.validity.valid равно false, выводится сообщение об ошибке, а если true — ошибка убирается.
function checkInputValidity(inputElement) {
    if (inputElement.type == "tel") {
        let arrNumTel = inputElement.value.split("")

        let arrNums = arrNumTel.filter(function(item) {
            return Number(item)
        })  
        if (arrNums.length < 10) {
            toggleErrorSpan(inputElement, "Введите корректный номер телефона")
        }
        else {
            toggleErrorSpan(inputElement)
        }
    }

    else if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity(checkLengthMismatch(inputElement))
    }
}
  
function checkLengthMismatch(inputElement) {
    if (inputElement.type !== 'text') {
        return ''
    }
    const valueLength = inputElement.value.trim().length
    if (valueLength < inputElement.minLength) {
        return `Минимальное количество символов: ${inputElement.minLength}`
    }
    return ''
}

function toggleInputError(inputElement) {
    if (inputElement.type == "tel") {
        let arrNumTel = inputElement.value.split("")

        let arrNums = arrNumTel.filter(function(item) {
            return Number(item)
        })  
        if (arrNums.length < 10) {
            toggleErrorSpan(inputElement, "Введите корректный номер телефона")
        }
        else {
            toggleErrorSpan(inputElement)
        }
    }
    else if (!inputElement.validity.valid) {
        toggleErrorSpan(inputElement, inputElement.validationMessage)
    } else {
        toggleErrorSpan(inputElement)
    }
}
  


// Функция toggleButton() устроена просто: она блокирует кнопку, когда находит невалидные поля, и вновь активирует её, если все поля заполнены корректно. Функция hasInvalidInput() проверяет поля ввода и чекбокс на наличие ошибок и возвращает true или false, основываясь на том, обнаружены ли невалидные данные.

// Блокировка кнопки отправки формы — рискованный приём. Важно учитывать различные варианты поведения пользователя. Чтобы избежать ситуаций, когда пользователь не понимает причину блокировки кнопки, мы принимаем следующие меры:
    // Применяем класс button-inactive, который изменяет цвет кнопки на менее яркий, подсказывая пользователю, что нажатие невозможно.
    // Добавляем через этот класс свойства cursor: not-allowed;, которое меняет форму курсора на символ запрета.
    // При клике по кнопке отправки формы или при нажатии на неё с клавиатуры показываем ошибку, которая объясняет причину блокировки. Реализуем это с помощью JavaScript.
    // В случае ввода невалидных данных в одно из полей, пользователь получает обратную связь о допущенной ошибке после потери фокуса на поле или после того, как снят маркер с обязательного чекбокса.
    // Как только пользователь ввёл валидные данные, кнопка становится активной.
    // Чтобы заблокированная кнопка была заметна пользователям, перемещающимся по сайту с помощью клавиши Tab, мы добавляем к кнопке атрибут aria-disabled.
// Так же напоминаем, что при блокировке кнопки отправки формы важно удостовериться, что требования к заполнению формы разумны и могут быть выполнены всеми пользователями. Следует избегать установления чрезмерно строгих условий для данных, вводимых пользователем. К примеру, пользователь может столкнуться с тем, что его имя слишком длинное для установленного в форме ограничения в 10 символов, что сделает невозможным отправку формы и ограничит доступ к вашему продукту.
function toggleButton() {
    if (hasInvalidInput()) {
        buttonElement.classList.add('button-inactive')
        buttonElement.setAttribute('aria-disabled', 'true')
    } else {
        buttonElement.classList.remove('button-inactive')
        buttonElement.setAttribute('aria-disabled', 'false')
        // Удаляем текст ошибки
        formErrorElement.textContent = ''
    }
}

function hasInvalidInput() {
    if (mainDoc.querySelector(".form-field-container__telephone-error").textContent == "") {
        return false
    }
    return (
        inputList.some(inputElement => !inputElement.validity.valid)
    )
}
  
// Здесь храним и добавляем текст к нужному контейнеру
function formError() {
    const errorMessage = 'Заполните все поля для отправки формы.'
    formErrorElement.textContent = errorMessage
}



// Осталось самое лёгкое — сделать активными элементы с ошибками. Если поле ввода оказалось невалидным, то скрипт показывает заранее подготовленный элемент с сообщением об ошибке. Если поле становится валидным, то сообщение исчезает. Именно в этой функции нам пригодился трюк, где мы создавали класс ошибки по следующему шаблону: id input-элемента + '-error'
function toggleErrorSpan(inputElement, errorMessage){
    const errorElement = document.querySelector(`#${inputElement.id}-error`)
    if (errorMessage) {
        inputElement.classList.add('form-field-container__type-input')
        errorElement.textContent = errorMessage
        errorElement.classList.add('form-field-container__error-active')
    } else {
        inputElement.classList.remove('form-field-container__type-input')
        errorElement.textContent = ''
        errorElement.classList.remove('form-field-container__error-active')
    }
}
  






