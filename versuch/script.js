const footer = document.getElementById('footer');
        
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Footer ist sichtbar, leite weiter
            window.location.href = '../5.Teil/index.html';
        }
    });
});

observer.observe(footer);