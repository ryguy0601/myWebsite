
// document.getElementsByTagName(
// 	"head"
// )[0].innerHTML += `<link rel="stylesheet" href="/navbar/nav.css">`;


fetch("/navbar/nav.html")
	.then((response) => response.text())
	.then((data) => {
		document.getElementById("nav").innerHTML = data;
		console.log(data)
	})
	.catch((error) => {
		console.error("Error:", error);
	});

fetch("/navbar/nav.css")
	.then((response) => response.text())
	.then((data) => {
		const style = document.createElement("style");
		style.innerHTML = data;
		document.head.appendChild(style);
		console.log(data)
	})
	.catch((error) => {
		console.error("Error:", error);
	});
