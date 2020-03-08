window.onload = function () {
	var posts = JSON.parse(localStorage.getItem("posts"));
	var url = document.location.href,
			params = url.split('?')[1].split('&'),
			data = {}, tmp;
		for (var i = 0, l = params.length; i < l; i++) {
			 tmp = params[i].split('=');
			 data[tmp[0]] = tmp[1];
		}
//		document.getElementById('here').innerHTML = data.name;
		console.log(data);
		console.log(url);
	console.log(posts);

	document.getElementById("postTitle").innerHTML = posts[0].title;
	document.getElementById("backButton").innerHTML = "Go Back to Posts"
	document.getElementById("backButton").addEventListener("click", function (e) {
		console.log("Back button clicked");
		window.history.back();
		location.reload();
	})
	

}


