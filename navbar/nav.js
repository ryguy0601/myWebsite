
document.getElementsByTagName(
	"head"
)[0].innerHTML += `<link rel="stylesheet" href="/navbar/nav.css">`;


// fetch("/navbar/nav.html")
// 	.then((response) => response.text())
// 	.then((data) => {
// 		document.getElementById("nav").innerHTML = data;
// 		console.log(data)
// 	})
// 	.catch((error) => {
// 		console.error("Error:", error);
// 	});

// console.log(1)
(async function(){
	let code = await fetch("/navbar/nav.html").then((response) => response.text())
	let location = document.getElementById("nav")
	location.innerHTML = code;
})();

	// .then((response) => response.text())
	// .then((data) => {
	// 	document.getElementById("nav").innerHTML = data;
	// 	console.log(data)
	// })
	// .catch((error) => {
	// 	console.error("Error:", error);
	// });