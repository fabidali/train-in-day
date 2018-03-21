// Initialize Firebase

  var config = {
    apiKey: "AIzaSyDTGufvyw2ou93NjL8VFqT3L0_HoNgIdU4",
    authDomain: "train-ing-day.firebaseapp.com",
    databaseURL: "https://train-ing-day.firebaseio.com",
    projectId: "train-ing-day",
    storageBucket: "train-ing-day.appspot.com",
    messagingSenderId: "932740579336"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

$(document).ready(function(){
	// 1. Link to Firebase
	

		$("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

		

  		// Grabs user input
  		var trainName = $("#train-Name-input").val().trim();
  		var addDestination = $("#add-Destination-input").val().trim();
  		var addFrequency = $("#add-Frequency-input").val().trim();
  		var arrivalTime = $("#add-arrivalTime-input").val().trim();
  		var timeInterval = $("#add-timeInterval-input").val().trim();


		// Logs everything to console
		// console.log(trainName);
		// console.log(addDestination);
		// console.log(addFrequency);
		// console.log(arrivalTime);
		// console.log(timeInterval);


		// Creates local "temporary" object for holding employee data
		var addTrain = {
			name:  trainName,
			destination: addDestination,
			frequency: addFrequency,
			arrival: arrivalTime,
			time: timeInterval,
		};

		// this pushes train data to Firebase
		trainData.ref().push(addTrain);

		 
  		// Clears all of the text-boxes
  		$("#train-Name-input").val("");
  		$("#add-Destination-input").val("");
  		$("#add-Frequency-input").val("");
  		$("#add-arrivalTime-input").val("");
  		$("#add-timeInterval-input").val("");
		});	

		
	

		// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
		trainData.ref().on("value", function(snapshot) {

  		console.log(snapshot.val());
  		var snapshotLength = Object.keys(snapshot.val()).length
  		var newTrainEntry = snapshot.val()[Object.keys(snapshot.val())[snapshotLength-1]]
  		// assign firebase variables
		var firebasetrainName = newTrainEntry.name;
		var firebaseaddDestination = newTrainEntry.destination;
		var firebaseaddFrequency = newTrainEntry.frequency;
		var firebasearrivalTime = newTrainEntry.arrival;
		var firebasetimeInterval = newTrainEntry.time;

		
		var diffTime = moment().diff(moment.unix(firebasearrivalTime), "minutes");
		var timeLeft = moment().diff(moment.unix(firebasearrivalTime), "minutes") % firebaseaddFrequency ;
		var minutes = firebaseaddFrequency - timeLeft;

		var nextTrain = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrain);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrain);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebasetrainName + "</td><td>" + firebaseaddDestination + "</td><td>"+ firebaseaddFrequency + "</td><td>" +  nextTrain + "</td><td>" + minutes + " mins"  + "</td></tr>");

	});
	});
