window.onload = function () {
	
	// Loading posts from local storage
	var posts = JSON.parse(localStorage.getItem("posts"));
	
	// // Getting post id from url
	var url = document.location.href,
			params = url.split('?')[1].split('&'),
			data = {}, tmp;
		for (var i = 0, l = params.length; i < l; i++) {
			 tmp = params[i].split('=');
			 data[tmp[0]] = tmp[1];
		}
	var postId = data.post;
	
	// Displaying post title and body
	for (var i = 0; i < posts.length; i++) {
		if (posts[i].id == postId) {
			document.getElementById("postTitle").innerHTML = posts[i].title;
			document.getElementById("postText").innerHTML = posts[i].body;	
			break;
		}
	}
	
	// Calling get comments to, well, get comments.
	getComments(postId);
}

// back to login page
function goBack () {
	console.log("Back button clicked");
	window.history.back();
}

// Gets comments base on post id, then creates a list and displays and
// saves to local storage
function getComments (postId) {
	console.log("ID:" + postId);
	let url = "https://jsonplaceholder.typicode.com/comments/" 	
	fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let commentResults = data;
		console.log(commentResults);
		var i;
		var info = [];
		for (i = 0; i < commentResults.length; i++) { 
			if (commentResults[i].postId == postId) {
				info.push(commentResults[i]);
			}
		}
		console.log(info);
		var ul = document.getElementById("comments");
			info.forEach(function(comment){
				var li = document.createElement('li');
				ul.appendChild(li);
				li.innerHTML += comment.name;
			});
		localStorage.setItem("comments", JSON.stringify(info));
		}).catch(function(err) {
		console.error(err);
	});
		
}


