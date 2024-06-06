const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
    "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
    "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli",
    "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla",
    "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ",
    "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt",
    "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis",
    "Osmaniye", "Düzce"
];

const cityDropdown = document.getElementById('cityDropdown');

// Şehirleri dropdown'a ekleyin
cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    cityDropdown.appendChild(option);
});

document.getElementById('getWeatherDropdown').addEventListener('click', function() {
    const city = document.getElementById('cityDropdown').value;
    const apiKey = '7a920cb3a3383cef2e964a43532171ce';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const formattedDescription = weatherDescription.split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');

                const weatherDetails = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Sıcaklık: ${data.main.temp}°C</p>
                    <p>Hava: ${formattedDescription}</p>
                    <p>Nem: ${data.main.humidity}%</p>
                    <p>Rüzgar Hızı: ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weatherDetailsDropdown').innerHTML = weatherDetails;
            } else {
                document.getElementById('weatherDetailsDropdown').innerHTML = `<p>Şehir bulunamadı. Lütfen tekrar deneyin.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherDetailsDropdown').innerHTML = `<p>Hava durumu bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.</p>`;
        });
});

document.getElementById('getWeatherInput').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '7a920cb3a3383cef2e964a43532171ce';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const formattedDescription = weatherDescription.split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');

                const weatherDetails = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Sıcaklık: ${data.main.temp}°C</p>
                    <p>Hava: ${formattedDescription}</p>
                    <p>Nem: ${data.main.humidity}%</p>
                    <p>Rüzgar Hızı: ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weatherDetailsInput').innerHTML = weatherDetails;
            } else {
                document.getElementById('weatherDetailsInput').innerHTML = `<p>Şehir bulunamadı. Lütfen tekrar deneyin.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherDetailsInput').innerHTML = `<p>Hava durumu bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.</p>`;
        });
});


function updateDateTime() {
    const now = new Date();
    const datetime = now.toLocaleString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    document.getElementById('datetime').textContent = datetime;
}


window.onload = function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
};
