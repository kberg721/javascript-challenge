/*
	Kyle Bergman
	Javascript assignment
	INFO 343
*/

//Adds usability and functionality to the form page.
document.addEventListener('DOMContentLoaded', function(){

	//adds the states to the state selection bar
	for(var i = 0; i < 50; i++) {
		var elem = document.createElement("option");
		elem.label = usStates[i].name;
		elem.value = usStates[i].code;
		document.getElementsByName("state")[0].appendChild(elem);
	}

	//allows users to choose/fill in the "other" option for their occupation
	var occ = document.getElementById("occupation");
	occ.addEventListener('change', function(){
		if(occ.value == "other"){
			document.getElementsByName("occupationOther")[0].style.display = "initial";
		} else {
			document.getElementsByName("occupationOther")[0].style.display = "none";
		}
	})

	//gets the confirmation from the user that they do not want to sign up
	document.getElementById("cancelButton").addEventListener('click', function() {
		if (window.confirm("Are you sure?")) {
			window.location.href = "https://www.google.com";
		}
	})

	var fields = ["firstName", "lastName", "address1", "city", "state", "zip", "birthdate"];

	//performs form validation and prevents submit if invalid
	function onSubmit(evt) {
		try {
			preventSub = validateForm();
		} catch(exception) {
			console.log(exception);
			preventSub = false; //stop form submission to see error
		}
	 	if (!preventSub) { 
			evt.preventDefault(); 
			evt.returnValue = false; 
	 		return false; 
		}
	}

	//checks if the input is empty or a multiple spaces
	function valid(bool, name) {
		if(document.getElementsByName(name)[0].value.trim().length == 0){
			document.getElementsByName(name)[0].style.border = "1px solid #FF0000";
			bool = false;
		} else {
			document.getElementsByName(name)[0].style.border = "none";
		}
		return bool;
	}

	//displays to the user that their birthdate is invalid
	function invalidDate(bool) {
		bool = false;
		document.getElementById("birthdateMessage").innerHTML = "User must be at least 13 years of age";
	}

	//validates all fields
	function validateForm() {
		var bool = true;
		var zipRegExp = new RegExp('^\\d{5}$');
		var date = new Date(document.getElementsByName("birthdate")[0].value);
		var today = new Date();

		//Checks main fields
		for(var i = 0; i < fields.length; i++){
			bool = valid(bool, fields[i]);
		}

		//checks "other" occupation option
		if(occ.value == "other") {
			bool = valid(bool, "occupationOther");
		}

		//tests zip code pattern
		if(!zipRegExp.test(document.getElementsByName("zip")[0].value)) {
			document.getElementsByName("zip")[0].style.border = "1px solid #FF0000";
			bool = false;
		} else {
			document.getElementsByName("zip")[0].style.border = "none";
		}

		//tests valid birthdate
		if((today.getFullYear() - 13) < date.getFullYear()) {
			invalidDate();
		} else if(((today.getFullYear() - 13) == date.getFullYear()) && (today.getMonth() < date.getUTCMonth())) {
			invalidDate();
		} else if(((today.getFullYear() - 13) == date.getFullYear()) && (today.getMonth() == date.getUTCMonth())
			&& (today.getDate() < date.getUTCDate())) {
			invalidDate();
		} else {
			document.getElementById("birthdateMessage").innerHTML = "";
		}

		return bool;
	}

	var signupForm = document.getElementById('signup');
	signupForm.addEventListener('submit', onSubmit);
		
 });