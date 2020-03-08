window.onload = function () {
	var albums = JSON.parse(localStorage.getItem("albums"));
	var url = document.location.href,
	params = url.split('?')[1].split('&'),
	data = {}, tmp;
		for (var i = 0, l = params.length; i < l; i++) {
			tmp = params[i].split('=');
			data[tmp[0]] = tmp[1];
		}
		console.log(data);
		var albumId = data.album	;
		console.log("PiD: " + albumId)
		console.log(data.album);	
		console.log("Length: " + albums.length);
		console.log("Album: " + albumId);
		
		for (var i = 0; i < albums.length; i++) {
			if (albums[i].id == albumId) {
				document.getElementById("albumTitle").innerHTML = "Title: " + albums[i].title
				console.log("id: " + albums[i].id + " albumId: " + albumId + " matches");
				break;
				}
			}

	getPhotos(albumId);

}

function goBack () {
	console.log("Back button clicked");
	window.history.back();
}

function getPhotos (albumId) {
	console.log("ID:" + albumId);
	let url = "https://jsonplaceholder.typicode.com/photos/" 	
	fetch(url)
		.then(function(response) {
			return response.json();
		}).then(function(data) {
		let photoResults = data;
		console.log(photoResults);
		var i;
		var info = [];
		for (i = 0; i < photoResults.length; i++) { 
			if (photoResults[i].albumId == albumId) {
				info.push(photoResults[i]);
			}
		}
		console.log(info);
		var ul = document.getElementById("photos");
			info.forEach(function(photo){
				var thumbnailUrl = photo.thumbnailUrl;
				console.log("thumb: " + thumbnailUrl);
				var li = document.createElement('li');
				var img = document.createElement('img')
				ul.appendChild(li);
				li.style.listStyleType = 'none';
				li.appendChild(img);
				img.src = thumbnailUrl;
				li.innerHTML += photo.title;
			});
		localStorage.setItem("photos", JSON.stringify(info));
		}).catch(function(err) {
		console.error(err);
	});
		
}

function fetchThumbnail (thumbnailUrl) {
	let url = thumbnailUrl
	fetch(url)
			.then(function(response) {
				return response.json();
			}).then(function(data) {
			let thumbnail = data;
			console.log(photoResults);
			var i;
			var info = [];
			for (i = 0; i < photoResults.length; i++) { 
				if (photoResults[i].albumId == albumId) {
					info.push(photoResults[i]);
				}
			}
			console.log(info);
			var ul = document.getElementById("photos");
				info.forEach(function(photo){
					var thumbnailUrl = photo.thumbnailUrl;
					console.log("thumb: " + thumbnailUrl);
					var li = document.createElement('li');
					ul.appendChild(li);
					li.innerHTML += photo.title;
				});
			localStorage.setItem("photos", JSON.stringify(info));
			}).catch(function(err) {
			console.error(err);
		});

}
