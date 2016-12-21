(function(){

	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyAUQ23n1lPJTg7gNvxd0Jx1V5Jgc2poOCg",
	    authDomain: "recipieshub.firebaseapp.com",
	    databaseURL: "https://recipieshub.firebaseio.com",
	    storageBucket: "recipieshub.appspot.com",
	    messagingSenderId: "429433030382"
	};
	firebase.initializeApp(config);

	// Get elements
	const recipiesList = document.getElementById('recipiesList');

	// Create references
	var urlVars = getUrlVars();
	console.log(urlVars["cat"]);

	const dbRefRecipiesList = firebase.database().ref().child('recipies');
	const dbRefCategorie = dbRefRecipiesList.child(urlVars["cat"]);

	var storage = firebase.storage();

	// Sync data
	dbRefCategorie.on('child_added', snap => {
		
		var nr ='<div class="ui card" id="recipies_list_item">\
					<a href="recipieDesc.html?cat=' + urlVars["cat"] + '&id=' + snap.key + '">\
						<div class="image">\
				      		<img class="ui image" id="' + urlVars["cat"] + snap.key + '">\
						</div>\
					</a>\
					<div class="content" id="desc">\
						<a href="recipieDesc.html?cat=' + urlVars["cat"] + '&id=' + snap.key + '">\
							<div id="recipie_title">'+ snap.val().name +'</div>\
						</a>\
					</div>\
				</div>';    

		$(recipiesList).append(nr);

		// image
	    var pathReference = storage.ref('images/'+ urlVars["cat"] + snap.key + '.jpg');

	    pathReference.getDownloadURL().then(function(url) {
	    	var img = document.getElementById(urlVars["cat"] + snap.key);
  			img.src = url;
	    }).catch(function(error) {
	      // Handle any errors
	    });
	});

	// Update changed value
	dbRefCategorie.on('child_changed', snap => {
		const liChanged = document.getElementById(snap.key);
		liChanged.innerText = snap.val();
	});

	// Update removed value
	dbRefCategorie.on('child_removed', snap => {
		const liToRemove = document.getElementById(snap.key);
		liToRemove.remove();
	});


}());

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	    vars[key] = value;
	});
	return vars;
 }

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
