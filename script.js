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

// Randevu Takvimi Dinamik Mantığı
let currentDate = new Date();
let bookedDates = []; // Format: 'YYYY-MM-DD', randevu alınan günleri saklar
let selectedDate = null;
let selectedTime = null;

// Müsait olduğunuz varsayılan saat dilimleri (kendinize göre değiştirebilirsiniz)
const availableTimes = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

function renderCalendar() {
    const monthYear = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    if (!monthYear || !calendarDays) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    monthYear.innerText = `${monthNames[month]} ${year}`;

    calendarDays.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let startDay = firstDay === 0 ? 6 : firstDay - 1; // Takvimi Pazartesiden başlatıyoruz

    for (let i = 0; i < startDay; i++) {
        let emptyDiv = document.createElement('div');
        emptyDiv.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyDiv);
    }

    let today = new Date();
    today.setHours(0,0,0,0); // Sadece tarihi baz almak için saatleri sıfırlıyoruz

    for (let i = 1; i <= daysInMonth; i++) {
        let dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.innerText = i;

        let dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        let currentDayDate = new Date(year, month, i);

        if (bookedDates.includes(dateString)) {
            dayDiv.classList.add('booked');
            dayDiv.title = "Bu gün doludur";
        } else if (currentDayDate < today) {
            dayDiv.classList.add('past'); // Geçmiş günler
        } else {
            dayDiv.onclick = () => selectDate(dateString, dayDiv);
        }

        if (selectedDate === dateString) {
            dayDiv.classList.add('selected');
        }

        calendarDays.appendChild(dayDiv);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
    document.getElementById('time-section').style.display = 'none';
    document.getElementById('appointment-form').style.display = 'none';
}

function selectDate(dateString, element) {
    document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    selectedDate = dateString;
    selectedTime = null;

    document.getElementById('selected-date-label').innerText = dateString;
    document.getElementById('apt-date').value = dateString;
    
    renderTimeSlots();
    
    document.getElementById('time-section').style.display = 'block';
    document.getElementById('appointment-form').style.display = 'flex';
    document.getElementById('apt-time').value = ''; // Yeni gün seçilince saati sıfırla
}

function renderTimeSlots() {
    const timeSlotsDiv = document.getElementById('time-slots');
    timeSlotsDiv.innerHTML = '';
    availableTimes.forEach(time => {
        let timeDiv = document.createElement('div');
        timeDiv.classList.add('time-slot');
        timeDiv.innerText = time;
        timeDiv.onclick = () => selectTime(time, timeDiv);
        timeSlotsDiv.appendChild(timeDiv);
    });
}

function selectTime(time, element) {
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedTime = time;
    document.getElementById('apt-time').value = time;
}

function handleAppointmentSubmit(event) {
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
        alert("Lütfen takvimden uygun bir tarih ve saat seçin.");
        return;
    }

    // Randevu alınan günü KIRMIZI (dolu) yapmak için bookedDates listemize ekliyoruz
    bookedDates.push(selectedDate);
    alert(`Randevunuz başarıyla oluşturuldu!\nTarih: ${selectedDate}\nSaat: ${selectedTime}`);
    
    document.getElementById('appointment-form').reset();
    document.getElementById('appointment-form').style.display = 'none';
    document.getElementById('time-section').style.display = 'none';
    selectedDate = null;
    selectedTime = null;

    renderCalendar(); // Takvimi günceller ve o günü kırmızı (booked) yapar
}

document.addEventListener('DOMContentLoaded', () => {
    createMathSymbols(); // Arka plan matematiği başlasın
    renderCalendar(); // Takvim çizilsin
});
