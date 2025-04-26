document.getElementsByTagName(
	"head"
)[0].innerHTML += `<link rel="stylesheet" href="../navbar/nav.css">`;


document.addEventListener("DOMContentLoaded", () => {
	fetch("../navbar/nav.html")
		.then((response) => response.text())
		.then((data) => {
			const navContainer = document.createElement("div");
			navContainer.id = "nav";
			document.body.insertBefore(navContainer, document.body.firstChild);
			document.getElementById("nav").innerHTML = data;
		})
		.then(() => {
			const getPreferredScheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			const themeToggle = document.querySelector('#themeToggle');
			if (themeToggle) {
				themeToggle.addEventListener('click', () => {
					// console.log("Theme toggle clicked.");
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
		
		
			const root = document.documentElement;
		
			console.log(`Preferred color scheme: ${getPreferredScheme()}`);
		
			if (getPreferredScheme() === 'dark') {
				document.querySelector('#themeToggle').checked = true;
				root.classList.toggle('light-mode', false);
			} else {
				document.querySelector('#themeToggle').checked = false;
				root.classList.toggle('light-mode', true);
			}
		})
		.catch((error) => {
			console.error("Error:", error);
	});

});





