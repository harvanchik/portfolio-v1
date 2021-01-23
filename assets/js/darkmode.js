let darkModeStorage = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-toggle-button');

const enableDarkMode = () => {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
};
const disableDarkMode = () => {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', null);
};

const toggleDarkMode = () => {
    if (darkModeStorage === 'true') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
};

if (darkModeStorage === 'true') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    // update local storage
    darkModeStorage = localStorage.getItem('darkMode');
    toggleDarkMode();
});