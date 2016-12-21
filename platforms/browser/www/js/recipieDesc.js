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

    // Create references
    var urlVars = getUrlVars();

    // data
	const dbRefRecipiesList = firebase.database().ref().child('recipies');
	const dbRefCategorie = dbRefRecipiesList.child(urlVars["cat"])
    const dbRefRecipie = dbRefCategorie.child(urlVars["id"]);
    const dbRefIngredients = dbRefRecipie.child("ingredients");
    const dbRefPrepSteps = dbRefRecipie.child("prep");

    // image
    var storage = firebase.storage();
    var pathReference = storage.ref('images/'+ urlVars["cat"] + urlVars["id"] + '.jpg');

    pathReference.getDownloadURL().then(function(url) {
      var img = document.getElementById('plate_img');
      img.src = url;
    }).catch(function(error) {
      // Handle any errors
    });

    dbRefRecipie.once('value').then(function(snapshot) {
        document.getElementById('dish_name').innerHTML = snapshot.val().name;
    });

    dbRefIngredients.on('child_added', snap => {
        const ingredientsList = document.getElementById('ingredientsList');
        var newRow ="<div class='item'>" + snap.val() + "</div>";
    $(ingredientsList).append(newRow);
    });

    dbRefPrepSteps.on('child_added', snap => {
        const prepSteps = document.getElementById('prepSteps');
        var newRow ="<li>" + snap.val() + "</li>";
    $(prepSteps).append(newRow);
    });

    const top_bar = document.getElementById('top-bar');

    var nr ='<a href="recipies.html?cat='+ urlVars["cat"] +'">\
        <i class="arrow left icon" id="back"></i>\
        Back\
      </a>';

    $(top_bar).append(nr);

}());

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	    vars[key] = value;
	});
	return vars;
}
