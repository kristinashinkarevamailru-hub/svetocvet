// ========== ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ПРИ ПРОКРУТКЕ ==========
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

// ========== МОДАЛЬНОЕ ОКНО ДЛЯ КНОПКИ "ЗАКАЗАТЬ ЗВОНОК" ==========
// Создаём модальное окно динамически
const modalHTML = `
<div id="callbackModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3>Оставьте заявку</h3>
        <p>Мы перезвоним вам в течение 15 минут</p>
        <form id="callbackForm">
            <input type="text" placeholder="Ваше имя" required>
            <input type="tel" placeholder="Номер телефона" required>
            <button type="submit">Перезвоните мне</button>
        </form>
    </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

const modal = document.getElementById('callbackModal');
const closeBtn = document.querySelector('.close');
const callButtons = document.querySelectorAll('.btn');

// Открыть модалку
callButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

// Закрыть по крестику
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Закрыть по клику вне окна
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Обработка отправки формы (имитация)
const form = document.getElementById('callbackForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Мы скоро свяжемся с вами.');
        modal.style.display = 'none';
        form.reset();
    });
}

// ========== АККОРДЕОН НА СТРАНИЦЕ УСЛУГ ==========
const initAccordion = () => {
    const serviceItems = document.querySelectorAll('.service-accordion-item');
    serviceItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Закрываем все
            serviceItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
};

if (document.querySelector('.service-accordion')) initAccordion();

// ========== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});
// ========== ЛАЙТБОКС ДЛЯ ГАЛЕРЕИ МЕРОПРИЯТИЙ ==========
const initLightbox = () => {
    // Создаём элемент лайтбокса
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="Увеличенное фото">';
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    
    // Находим все картинки в .event-photo и .media-item (для контактов тоже)
    const galleryImages = document.querySelectorAll('.event-photo img, .media-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });
    
    // Закрыть лайтбокс при клике
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
    });
    
    // Закрыть по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        }
    });
};

// Запускаем после загрузки страницы
document.addEventListener('DOMContentLoaded', initLightbox);