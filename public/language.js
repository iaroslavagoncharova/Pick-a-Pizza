function changeLanguage(lang) {
    document.querySelectorAll('.lang-option').forEach(function(element) {
        element.classList.remove('active-lang');
    });

    document.getElementById(lang).classList.add('active-lang');
}