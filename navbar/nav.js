document.getElementsByTagName(
	"head"
)[0].innerHTML += `<link rel="stylesheet" href="../navbar/nav.css">`;


// document.getElementById("nav").innerHTML= nav.html

// `
// <nav class="navbar">
// 	<a href="/main/index.html">Home</a>
// 	<div class="nav-dropdown">
// 		<button class="nav-dropbtn">Games</button>
// 		<div class="nav-dropdown-content">
// 			<a href="/2048/2048.html">2048</a>
// 			<a href="/chess/chess.html">Chess(WIP)</a>
// 		</div>
// 	</div>
// </nav>
// `


fetch("nav.html")
	.then((response) => response.text())
	.then((data) => {
		document.getElementById("nav").innerHTML = data;
		console.log(data)
	})
	.catch((error) => {
		console.error("Error:", error);
	});

// console.log(1)
// (async function(){
// 	let code = await fetch("https://ryguy0601.github.io/myWebsite/navbar/nav.js").then((response) => response.text())
// 	let location = document.getElementById("nav")
// 	location.innerHTML = code;
// })();

// .then((response) => response.text())
// .then((data) => {
// 	document.getElementById("nav").innerHTML = data;
// 	console.log(data)
// })
// .catch((error) => {
// 	console.error("Error:", error);
// });
