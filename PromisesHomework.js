var name = window.prompt("Please enter a name");
//name = "Ervin Howell"

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
				document.getElementById("name").innerHTML = info.name;
				break;
			} else {
				console.log(searchResults[i].name + " not found")
				document.getElementById("name").innerHTML = "There was no user with the name! Please enter a valid username"
				document.getElementsByTagName('h3')[0].style.display = 'none';
				document.getElementsByTagName('h3')[1].style.display = 'none';
			}
		}
	id = info.id
	getPosts(id);
	getAlbums(id);

	}).catch(function(err) {
	console.error(err);
});

function getPosts (id) {
	let url = "https://jsonplaceholder.typicode.com/users/" + id + "/posts/"
	fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let postResults = data;
		console.log(postResults);
		var ul = document.getElementById("posts");
			postResults.forEach(function(post){
				var li = document.createElement('li');
				ul.appendChild(li);
				li.innerHTML += post.title;
			});
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
		var ul = document.getElementById("albums");
			albumResults.forEach(function(album){
				var li = document.createElement('li');
				ul.appendChild(li);
				li.innerHTML += album.title;
			});

		}).catch(function(err) {
		console.error(err);
	});
}