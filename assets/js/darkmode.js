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

const toggleDarkMode = () => {
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
// if the class has no icon for some reason, just give it the fa-sun class
if (!(sunMoonIcon.hasClass('fa-sun')) && !(sunMoonIcon.hasClass('fa-moon'))) {
    sunMoonIcon = $('#sun-moon');
    sunMoonIcon.addClass('fa-sun');
}

/**
 * Event listen that listens for click on dark mode toggle button
 */
darkModeToggle.on('click', () => {
    // update local storage
    darkModeStorage = localStorage.getItem('darkMode');
    toggleDarkMode();
});