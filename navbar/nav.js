
document.getElementsByTagName(
	"head"
)[0].innerHTML += `<link rel="stylesheet" href="/navbar/nav.css">`;


fetch("/navbar/nav.html")
	.then((response) => response.text())
	.then((data) => {
		document.getElementById("nav").innerHTML = data;
	})
	.catch((error) => {
		console.error("Error:", error);
	});

