document.getElementsByTagName("head")[0].innerHTML += `
<style>
#nav {
	padding-bottom:32px;
}
.navbar {
	/*overflow: hidden;*/
	background-image: linear-gradient(315deg, rgb(0 0 0), rgb(93 3 99));
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}

.navbar a {
	float: left;
	font-size: 16px;
	color: white;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
}

.nav-dropdown {
	float: left;
	overflow: hidden;
	background: none;
}

.nav-dropdown .nav-dropbtn {
	font-size: 16px;
	border: none;
	outline: none;
	color: white;
	padding: 14px 16px;
	background-color: inherit;

	font-family: inherit;
	margin: 0;
}

.navbar a:hover,
.nav-dropdown:hover .nav-dropbtn {
	/* background-color: #222222; */
	background-image: linear-gradient(315deg, rgb(93 3 99), rgb(0 0 0));
	border-image: linear-gradient(315deg, rgb(0 0 0), rgb(93 3 99));
}

.nav-dropdown-content {
	color: #ffffff;
	display: none;
	position: absolute;
	background-image: linear-gradient(315deg, rgb(0 0 0), rgb(93 3 99));
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
}

.nav-dropdown-content a {
	float: none;
	color: #ffffff;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	text-align: left;
}

.nav-dropdown-content a:hover {
	background-color: #222222;
}

.nav-dropdown:hover .nav-dropdown-content {
	display: block;
}

.content {
	
}
</style>
`;

// fetch("https://ryguy0601.github.io/myWebsite/navbar/nav.css")
// 	.then((response) => response.text())
// 	.then((data) => {
// 		const style = document.createElement("style");
// 		style.innerHTML = data;
// 		document.head.appendChild(style);
// 		console.log(data)
// 	})
// 	.catch((error) => {
// 		console.error("Error:", error);
// 	});

// fetch("https://ryguy0601.github.io/myWebsite/navbar/nav.html")
// 	.then((response) => response.text())
// 	.then((data) => {
// 		document.getElementById("nav").innerHTML = data;
// 		console.log(data)
// 	})
// 	.catch((error) => {
// 		console.error("Error:", error);
// 	});

document.getElementById("nav").innerHTML = `
<nav class="navbar">
	<a href="/index.html">Home</a>
	<div class="nav-dropdown">
		<button class="nav-dropbtn">Games</button>
		<div class="nav-dropdown-content">
			<a href="/2048/2048.html">2048</a>
			<a href="#">WIP</a>
		</div>
	</div>
</nav>

`;
