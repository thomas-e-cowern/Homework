window.onload = function () {
	
	// Loading albums from local storage
	var albums = JSON.parse(localStorage.getItem("albums"));
	
	// Getting album id from url
	var url = document.location.href,
	params = url.split('?')[1].split('&'),
	data = {}, tmp;
	for (var i = 0, l = params.length; i < l; i++) {
		tmp = params[i].split('=');
		data[tmp[0]] = tmp[1];
	}
	
	// Idolating album id
	var albumId = data.album	;
		
	// Using album id to get album title	
	for (var i = 0; i < albums.length; i++) {
		if (albums[i].id == albumId) {
			document.getElementById("albumTitle").innerHTML = "Album Title: " + albums[i].title
			break;
		}
	}

	// Call get photos function with album Id
	getPhotos(albumId);

}

// back to login page.
function goBack () {
	console.log("Back button clicked");
	window.history.back();
}

// getting photo info for the album
function getPhotos (albumId) {
	let url = "https://jsonplaceholder.typicode.com/photos/" 	
	fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let photoResults = data;
		var i;
		var info = [];
		
		// Iterating through the results to find matching photos based on album id 
		for (i = 0; i < photoResults.length; i++) { 
			if (photoResults[i].albumId == albumId) {
				info.push(photoResults[i]);
			}
		}
		
		// Creating the list for the photos and titles, and getting the thumbnails
		// and saving to local storage
		document.getElementById("loading").style.display = 'none';
		var ul = document.getElementById("photos");
			info.forEach(function(photo){
				var thumbnailUrl = photo.thumbnailUrl;
				var li = document.createElement('li');
				var img = document.createElement('img')
				var p = document.createElement('p')
				ul.appendChild(li);
				li.style.listStyleType = 'none';
				li.appendChild(p);
				li.appendChild(img);
				img.src = thumbnailUrl;
				p.innerHTML = photo.title;
			});
		localStorage.setItem("photos", JSON.stringify(info));
		}).catch(function(err) {
		console.error(err);
	});
}

// Search photo titles
function search () {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('search').value;
	console.log(input);
	filter = input.toUpperCase();
	ul = document.getElementById("photos");
	li = ul.getElementsByTagName('li');

	// Loop through all list items, and hide those who don't match the search query
	for (var i = 0; i < li.length; i++) {
		p = li[i].getElementsByTagName("p")[0];
		txtValue = p.textContent || p.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}
