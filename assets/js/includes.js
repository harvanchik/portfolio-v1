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
 * Age calculator
 * @param date The date in string form.
 * @returns the amount of whole years that have passed since the given date.
 */
function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
}