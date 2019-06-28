//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB-BdS8pNFP387fdnutOwwOs2SLMJtWSxU",
    authDomain: "idkman-12404.firebaseapp.com",
    databaseURL: "https://idkman-12404.firebaseio.com",
    projectId: "idkman-12404",
    storageBucket: "",
    messagingSenderId: "693184974943",
    appId: "1:693184974943:web:ef3513d71cd7f02e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Variables
var database = firebase.database();

//Train information gets stored and displayed onto webpage
    //Get 'snapshot' of stored data at initial load and subsequent value changes
    database.ref().on("child_added", function(snapshot) {
        var transportation = snapshot.val().transportation;
    	var destination = snapshot.val().destination;
    	var firstTransport = snapshot.val().firsttransport;
        var frequency = snapshot.val().frequency;

        console.log(destination);
        console.log(firstTransport);
        
        var firstTimeConverted = moment(firstTransport, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    $("#tbody").append("<tr> <td>" + transportation + "</td><td>" + destination + "</td><td>" + frequency + " mins</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain+ " mins</td>");

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code)
    });

//User submits train information
    $("#add-btn").on("click", function() {
        event.preventDefault();
        
        var transport = $("#transport-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var time = $("#time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        
        console.log(transport);

        //Adds info into database
        database.ref().push({
            transportation: transport,
            destination: destination,
            firsttransport: time,
            frequency: frequency,
        });
    });


//User clears train information    
    $("#clear-btn").on("click", function() {
        //create a reference to the file to delete
        var databaseRef = database.ref();

        databaseRef.remove();
        $("#tbody").empty();
    });