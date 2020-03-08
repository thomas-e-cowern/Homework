window.onload = function () {
	if (sessionStorage.getItem("userId") === null) {
		setUpPage();
	} else {
		loadPage("post");
		loadPage("album");
	}
		
}
	
function setUpPage () {
	console.log("Set up Page working");
	document.getElementById("postTitle").style.display = "none";
	document.getElementById("albumTitle").style.display = "none";
}
	
function login () {
	let name = document.getElementById("userName").value
	console.log(name);
	fetchName(name)
}

function logout () {
	console.log("Logging Out");
	localStorage.clear();
	sessionStorage.clear();
	location.href = "Login.html";			
}

function fetchName (name) {
	var id = 0;

	fetch('https://jsonplaceholder.typicode.com/users/')
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let searchResults = data;	
		var i;
			var info = {};
			for (i = 0; i < searchResults.length; i++) { 
				if (searchResults[i].name == name ) {
					info = searchResults[i];
					document.getElementById("name").style.display = "block";
					document.getElementById("name").innerHTML = info.name;
					document.getElementById("postTitle").style.display = "block";
					document.getElementById("albumTitle").style.display = "block";
					document.getElementById("posts").style.display = "block";
					document.getElementById("albums").style.display = "block";
					id = info.id
					getPosts(id);
					getAlbums(id);
					localStorage.setItem("user", JSON.stringify(info));
					sessionStorage.setItem("userId", JSON.stringify(info.id))
					break;
				} else {
					console.log(searchResults[i].name + " not found")
					document.getElementById("name").style.display = "block";
					document.getElementById("name").innerHTML = "There was no user with the name! Please enter a valid username"
					document.getElementById("postTitle").style.display = "none";
					document.getElementById("albumTitle").style.display = "none";
					document.getElementById("posts").style.display = "none";
					document.getElementById("albums").style.display = "none";
				}
			}
				}).catch(function(err) {
		console.error(err);
	});

}


function getPosts (id) {
	let url = "https://jsonplaceholder.typicode.com/users/" + id + "/posts/"
	fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let postResults = data;
		console.log(postResults);
		clearLists("posts")
		document.getElementsByTagName('h3')[0].style.display = 'h3';
		document.getElementsByTagName('h3')[1].style.display = 'h3';
		var ul = document.getElementById("posts");
			postResults.forEach(function(post){
				var li = document.createElement('li');
				ul.appendChild(li);
				li.addEventListener("click", function (e) {
					console.log(event.target.innerHTML);
					location.href = "Post.html?post="  + encodeURIComponent(post.id);
				})
				li.innerHTML += "Title " + post.id + ": " + post.title;
			});
		localStorage.setItem("posts", JSON.stringify(postResults));
		}).catch(function(err) {
		console.error(err);
	});
}

function getAlbums (id) {
	let url = "https://jsonplaceholder.typicode.com/users/" + id + "/albums/"
	fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let albumResults = data;
		console.log(albumResults);
		clearLists("albums")
		var ul = document.getElementById("albums");
			albumResults.forEach(function(album){
				var li = document.createElement('li');
				ul.appendChild(li);
				li.addEventListener("click", function (e) {
					console.log(event.target.innerHTML);
					location.href = "Album.html?album=" + encodeURIComponent(album.id);
				})
				li.innerHTML +=  "Album " + album.id + ": " + album.title;
			});
		localStorage.setItem("albums", JSON.stringify(albumResults));
		}).catch(function(err) {
		console.error(err);
	});
}

function clearLists(listName) {
	var list = document.getElementById(listName);
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
}

function loadPage(list) {
	var ul = document.getElementById("posts");
	if (list == "post") {
		var postResults = JSON.parse(localStorage.getItem("posts"));
		postResults.forEach(function(post){
					var li = document.createElement('li');
					ul.appendChild(li);
					li.addEventListener("click", function (e) {
						console.log(event.target.innerHTML);
						location.href = "Post.html?post="  + encodeURIComponent(post.id);
					})
					li.innerHTML += "Title " + post.id + ": " + post.title;
				});
	} else {
		var albumResults = JSON.parse(localStorage.getItem("albums"));
		var ul = document.getElementById("albums");
			albumResults.forEach(function(album){
				var li = document.createElement('li');
				ul.appendChild(li);
				li.addEventListener("click", function (e) {
					console.log(event.target.innerHTML);
					location.href = "Album.html?album=" + encodeURIComponent(album.id);
				})
				li.innerHTML +=  "Album " + album.id + ": " + album.title;
			});
	}
		
}