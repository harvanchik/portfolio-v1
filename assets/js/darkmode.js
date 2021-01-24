let darkModeStorage = localStorage.getItem('darkMode');
const darkModeToggle = $('#dark-toggle-button');
const body = $('#body');

let sunMoonIcon = $('#sun-moon');

const enableDarkMode = () => {
    body.addClass('dark');
    sunMoonIcon.addClass('fa-sun');
    sunMoonIcon.removeClass('fa-moon');
    localStorage.setItem('darkMode', 'true');
};

const disableDarkMode = () => {
    body.removeClass('dark');
    sunMoonIcon.addClass('fa-moon');
    sunMoonIcon.removeClass('fa-sun');
    localStorage.setItem('darkMode', 'false');
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
window.onload = function () {
    setTimeout(
        async () => {
            sunMoonIcon = $('#sun-moon');
            if (darkModeStorage === 'true') {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
            // add loaded class to body just after setting the mode
            // need this delay to disable fading of colors on initial load of page
            setTimeout(
                async () => {
                    body.attr('loaded', true);
                }, 15);
        }, 10  // delay so that the body has time to finish loading
    );
};