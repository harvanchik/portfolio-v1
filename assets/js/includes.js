// Loading HTML
$(function () {
    $("#header").load("/assets/html/header.html");
});
$(function () {
    $("#footer").load("/assets/html/footer.html");
});

/**
 * Toggles the navigation menu
 */
function toggleMenu() {
    const menu = document.querySelector('#menu');
    menu.classList.toggle('hidden');
}

/**
 * Toggles dark mode
 */
function toggleDarkMode() {
    const body = document.querySelector('#body');
    body.classList.toggle('dark');
}

/**
 * Age calculator
 * @param date The date in string form.
 * @returns the amount of whole years that have passed since the given date.
 */
function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
}