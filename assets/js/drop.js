const dropdownButton = document.getElementById('dropdownMenuLink');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownButton.addEventListener('click', function (e) {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    
    if (dropdownMenu.style.display === 'flex') {
        dropdownMenu.style.display = 'none'; // Menü gizle
        dropdownMenu.style.alignItems = 'flex-start'; // Menü gizlenince hizalama başlangıç noktasına döner (dikeyde)
    } else {
        dropdownMenu.style.display = 'flex'; // Menü göster
        dropdownMenu.style.alignItems = 'center'; // Menü açıldığında yatayda ortalanacak (row hizalama için)
    }
});
