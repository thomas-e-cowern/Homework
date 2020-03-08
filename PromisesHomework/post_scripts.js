window.onload = function () {
	var posts = JSON.parse(localStorage.getItem("posts"));
	var url = document.location.href,
			params = url.split('?')[1].split('&'),
			data = {}, tmp;
		for (var i = 0, l = params.length; i < l; i++) {
			 tmp = params[i].split('=');
			 data[tmp[0]] = tmp[1];
		}
	console.log(data);
	var postId = data.post;
	console.log("PiD: " + postId)
	console.log(data.post);	
	console.log(url);
	console.log(posts);
	for (var i = 0; i < posts.length; i++) {
		if (posts[i].id == postId) {
			console.log("id: " + posts[i].id + " postId: " + postId + " matches");
			document.getElementById("postTitle").innerHTML = posts[i].title;
			document.getElementById("postText").innerHTML = posts[i].body;	
			break;
		}
	}
	
	getComments(postId);
}

function goBack () {
	console.log("Back button clicked");
	window.history.back();
}

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


