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
		.catch((error) => {
			console.error("Error:", error);
		});
});