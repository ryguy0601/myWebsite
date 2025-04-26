const getPreferredScheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const themeToggle = document.querySelector('#themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const root = document.documentElement;
        const isDarkMode = themeToggle.checked;

        if (isDarkMode) {
            root.classList.toggle('light-mode', false);
        } else {
            root.classList.toggle('light-mode', true);
        }
        console.log(`Theme changed to: ${isDarkMode ? 'dark' : 'light'}`);
    });
}

window.onload = function () {
    const root = document.documentElement;

    console.log(`Preferred color scheme: ${getPreferredScheme()}`);

    if (getPreferredScheme() === 'dark') {
        document.querySelector('#themeToggle').checked = true;
        root.classList.toggle('light-mode', false);
    } else {
        document.querySelector('#themeToggle').checked = false;
        root.classList.toggle('light-mode', true);
    }

}

