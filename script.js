// Portfolyoya Giriş Fonksiyonu
function enterPortfolio() {
    // Giriş sayfasını gizle
    document.getElementById('intro-page').style.display = 'none';
    // Ana portfolyoyu göster
    document.getElementById('main-portfolio').style.display = 'block';
    // Sayfayı en üste hizala
    window.scrollTo(0, 0);
}

// Menü Butonlarına Tıklanınca İçerik Değiştirme Fonksiyonu
function showContent(sectionId) {
    // Tüm içerik sayfalarını gizle
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Tıklanan butona ait sayfayı göster
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// İçerik Sayfasını Kapatma Fonksiyonu
function closeContent() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
}

// Slayt Gösterisi (Slider) Fonksiyonu
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');

function changeSlide(direction) {
    // Aktif olan slaytı gizle
    slides[currentSlideIndex].classList.remove('active');

    // Yeni indeksi hesapla
    currentSlideIndex += direction;

    // Slayt sınırlarını döngüye al (Başa veya sona sarması için)
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Yeni slaytı göster
    slides[currentSlideIndex].classList.add('active');
}

// Matematik Sembolleri Yağmuru (Arka Plan Animasyonu)
function createMathSymbols() {
    const background = document.getElementById('math-background');
    if (!background) return;
    
    const symbols = ['∑', '∫', 'π', '∞', '√', '∆', 'θ', 'μ', '≈', '≠', '≤', '≥', 'Ω', 'α', 'β'];
    const symbolCount = 40; // Ekranda aynı anda süzülecek sembol sayısı

    for (let i = 0; i < symbolCount; i++) {
        let span = document.createElement('span');
        span.classList.add('math-symbol');
        span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Rastgele yatay konum, boyut ve hız (derinlik hissi yaratır)
        span.style.left = Math.random() * 100 + 'vw';
        span.style.fontSize = (Math.random() * 1.5 + 1.4) + 'rem'; // Boyutları biraz büyütüldü
        span.style.opacity = Math.random() * 0.5 + 0.5; // Görünürlüğü yüksek hale getirildi
        
        let duration = Math.random() * 15 + 10; // 10 ile 25 saniye arası düşüş hızı
        span.style.animationDuration = duration + 's';
        span.style.animationDelay = '-' + (Math.random() * 20) + 's'; // Sayfa açılır açılmaz ekranda dağınık olmaları için
        
        background.appendChild(span);
    }
}

document.addEventListener('DOMContentLoaded', createMathSymbols);