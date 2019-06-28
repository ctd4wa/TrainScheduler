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


var database = firebase.database();

$("#add-btn").on("click", function() {
    event.preventDefault();
    
    // Grabbing user input
    var transport = $("#transport-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(transport);

    // Uploading data into database
    database.ref().push({
        transportation: transport,
        destination: destination,
        firsttransport: time,
        frequency: frequency,
    });
});

// Snapshot for grabbing input
database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    var transportation = snapshot.val().transportation;
    var destination = snapshot.val().destination;
    var firstTransport = snapshot.val().firsttransport;
    var frequency = snapshot.val().frequency;

    console.log(destination);
    console.log(firstTransport);
        
    var firstTimeConverted = moment(firstTransport, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("The current time is: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("The time remainder: " + diffTime);
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("Minutes until next train: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log("Arrives: " + moment(nextTrain).format("hh:mm"));


    $("#tbody").append("<tr> <td>" + transportation + "</td><td>" + destination + "</td><td>" + frequency + " mins</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain+ " mins</td>");

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code)
    });
        