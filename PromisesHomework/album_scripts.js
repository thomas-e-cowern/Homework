window.onload = function () {
	var posts = JSON.parse(localStorage.getItem("posts"));

	console.log(posts);

	document.getElementById("postTitle").innerHTML = posts[0].title;

}
