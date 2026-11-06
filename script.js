// ===== Функция 1. Мобильное меню =====
// Кнопка «Меню» добавляет или убирает класс "open" у списка ссылок.
function setupMobileMenu() {
  var button = document.getElementById("menu-button");
  var menu = document.getElementById("menu");

  button.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open"); // true, если меню теперь открыто
    button.setAttribute("aria-expanded", isOpen);
  });

  // После нажатия на ссылку меню закрывается
  menu.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

// ===== Функция 2. Фильтрация проектов =====
// Нажатие на кнопку показывает только карточки нужной категории.
function setupProjectFilter() {
  var filterButtons = document.querySelectorAll(".filter");
  var projectCards = document.querySelectorAll(".project");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.dataset.filter; // например "design"

      // Подсвечиваем только нажатую кнопку
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");

      // Показываем или скрываем карточки
      projectCards.forEach(function (card) {
        var matches = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !matches);
      });
    });
  });
}

// ===== Функция 3. Модальное окно проекта =====
// Информация о проектах хранится в объекте: ключ совпадает с data-id кнопки.
var projectsInfo = {
  canteen: {
    meta: "Школьный хакатон, командный проект",
    title: "Smart Canteen",
    text: "Командный проект на тему управления школьным бюджетом. Мы искали решение проблемы пищевых отходов в школьных столовых: анализировали проблему, собирали информацию, считали экономию и придумали концепцию сайта и чат-бота.",
    role: "Участвовала в сборе информации и подготовила видеопрезентацию. Сайт и чат-бот в проекте — это концепция, самостоятельно я их не разрабатывала.",
    image: ""
  },
  novel: {
    meta: "GameLab, AIU, трёхдневный хакатон",
    title: "Онлайн-визуальная новелла",
    text: "GameLab — клуб, связанный с разработкой игр. На трёхдневном хакатоне наша команда создавала онлайн-визуальную новеллу.",
    role: "Участвовала в командной работе над игровой концепцией.",
    image: ""
  },
  ball: {
    meta: "Canva, школьное мероприятие",
    title: "Афиша «Весенний бал»",
    text: "Афиша для школьного конкурса «Весенний бал» в стиле почтовых марок с ботаническими иллюстрациями.",
    role: "Создание визуального материала в Canva: подбор шрифтов, цветов и композиции.",
    image: "assets/poster-spring-ball.jpg"
  },
  duet: {
    meta: "Canva, школьное мероприятие",
    title: "Афиша «Весенний дуэт»",
    text: "Афиша для школьного конкурса в тёплой коричнево-бордовой гамме с танцующими парами.",
    role: "Создание визуального материала в Canva: подбор шрифтов, цветов и композиции.",
    image: "assets/poster-spring-duet.jpg"
  },
  techyard: {
    meta: "IT-клуб, Ala-Too College",
    title: "IT-клуб TechYard",
    text: "IT-клуб при Ala-Too College. Здесь собираются те, кто интересуется программированием, технологиями и командными проектами.",
    role: "Участница клуба. Развиваю IT-навыки и учусь работать в команде.",
    image: ""
  }
};

function setupModal() {
  var modal = document.getElementById("modal");
  var closeButton = document.getElementById("modal-close");
  var image = document.getElementById("modal-image");
  var openButtons = document.querySelectorAll("[data-id]");

  // Открываем окно: берём данные проекта и подставляем в окно
  openButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var project = projectsInfo[button.dataset.id];

      document.getElementById("modal-meta").textContent = project.meta;
      document.getElementById("modal-title").textContent = project.title;
      document.getElementById("modal-text").textContent = project.text;
      document.getElementById("modal-role").textContent = project.role;

      // Картинка показывается только если она есть у проекта
      if (project.image) {
        image.src = project.image;
        image.alt = project.title;
        image.hidden = false;
      } else {
        image.hidden = true;
      }

      modal.showModal();
    });
  });

  // Закрываем: крестик или клик по тёмному фону (клавиша Esc работает сама)
  closeButton.addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (event) {
    if (event.target === modal) { modal.close(); }
  });
}

// ===== Функция 4. Проверка контактной формы =====
// Показывает ошибку под каждым неверным полем или сообщение об успехе.
function setupContactForm() {
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");

  // Показать или убрать ошибку у одного поля
  function showError(fieldId, message) {
    document.getElementById(fieldId + "-error").textContent = message;
    document.getElementById(fieldId).classList.toggle("invalid", message !== "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // страница не перезагружается

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var isValid = true;
    success.textContent = "";

    // Имя: не короче 2 символов
    if (name.length < 2) {
      showError("name", "Введите имя (минимум 2 буквы).");
      isValid = false;
    } else {
      showError("name", "");
    }

    // Email: простая проверка — есть @ и точка после неё
    var atPosition = email.indexOf("@");
    var dotPosition = email.lastIndexOf(".");
    if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition === email.length - 1) {
      showError("email", "Введите email в формате name@example.com.");
      isValid = false;
    } else {
      showError("email", "");
    }

    // Сообщение: не короче 10 символов
    if (message.length < 10) {
      showError("message", "Напишите сообщение (минимум 10 символов).");
      isValid = false;
    } else {
      showError("message", "");
    }

    if (isValid) {
      success.textContent = "Спасибо, " + name + "! Форма заполнена верно.";
      form.reset();
    }
  });
}

// ===== Кнопка «Вверх» =====
// Показывается, когда страница прокручена вниз больше чем на 300 пикселей.
function setupBackToTop() {
  var topButton = document.getElementById("to-top");

  window.addEventListener("scroll", function () {
    // window.scrollY — на сколько пикселей прокручена страница
    topButton.classList.toggle("visible", window.scrollY > 300);
  });
}

// ===== Функция 6. Переключатель темы (светлая / тёмная) =====
// Ставит на <html> атрибут data-theme="dark" или "light", а CSS меняет цвета.
function setupThemeToggle() {
  var button = document.getElementById("theme-button");
  var root = document.documentElement; // это тег <html>

  function applyTheme(theme) {
    root.dataset.theme = theme;
    button.textContent = theme === "dark" ? "Светлая" : "Тёмная";
    localStorage.setItem("theme", theme); // запоминаем выбор в браузере
  }

  // При загрузке берём сохранённую тему, если её нет — светлую
  applyTheme(localStorage.getItem("theme") || "light");

  button.addEventListener("click", function () {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

// Запускаем все функции
setupMobileMenu();
setupProjectFilter();
setupModal();
setupContactForm();
setupBackToTop();
setupThemeToggle();
