let darkModeStorage = localStorage.getItem('darkMode');
const darkModeToggle = $('#dark-toggle-button');
const body = $('#body');

let sunMoonIcon = $('#sun-moon');

const enableDarkMode = () => {
    body.addClass('dark');
    sunMoonIcon.addClass('fa-sun');
    localStorage.setItem('darkMode', 'true');
};

const disableDarkMode = () => {
    body.removeClass('dark');
    sunMoonIcon.addClass('fa-moon');
    localStorage.setItem('darkMode', null);
};

/**
 * Toggle dark mode
 * Switched from using event listener, because Safari iOS didn't recogize it
 */
const toggleDarkMode = () => {
    darkModeStorage = localStorage.getItem('darkMode');
    sunMoonIcon = $('#sun-moon');       // must update the reference to the element since fontawesome changes it from an <i> to an <svg>
    if (darkModeStorage === 'true') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
};

/**
 * Initializes the dark mode on page load
 */
if (darkModeStorage === 'true') {
    enableDarkMode();
} else {
    disableDarkMode();
}