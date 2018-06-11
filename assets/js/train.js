

  // 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBcSzBOO15HCpwESEm9GASdePKGpgA0Am4",
    authDomain: "train-schedule-e253a.firebaseapp.com",
    databaseURL: "https://train-schedule-e253a.firebaseio.com",
    projectId: "train-schedule-e253a",
    storageBucket: "train-schedule-e253a.appspot.com",
    messagingSenderId: "434678545784"
  };
  firebase.initializeApp(config);

// 2. Create button for adding new trains - then update the html + update the database
  var database = firebase.database();

// Button
  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  // var firstTrain = moment($("#first-train-input").val().trim()).format("HH:mm");
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

    // Alert
  // alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


 //      var nowTime = moment();
 //      console.log(nowTime);
 //    // var nowTime = "07:00"
 //    var formatTime = moment().format('HH:mm');
 //    console.log(formatTime)
 //    var convertedTime = moment(nowTime, formatTime);
 //    var firstTime = moment(firstTrain, formatTime);
 //    var frequencyTime = moment(firstTime, formatTime).add(frequency, 'minutes');



 //    // console.log(moment(frequencyTime).toNow());


 // var newTime = moment(frequencyTime, formatTime);
 //    console.log(moment(convertedTime).diff(moment(newTime), "HH:mm"));
 //    var nextArrivalInfo = moment(convertedTime).diff(moment(newTime), "minutes");


 //    //This will be the user input for the first train time plus frequency minus the current time
 //    var minutesAway = moment(firstTime, formatTime);
 //    var minutesAwayInfo = moment(convertedTime).diff(moment(minutesAway), "minutes");
 //    console.log(moment(convertedTime).diff(moment(minutesAway), "minutes"));

   var frequencyTime = frequency;
   console.log("Frequency Time:: " + frequencyTime)
   // var formatTime = moment().format('HH:mm');

    var firstTimeConverted = moment(firstTrain, "HH:mm");
    console.log("first time:" + (firstTimeConverted).format("HH:mm"));

    // Current Time
    var currentTime = moment();
    console.log("current time: " + (currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference in time: " + (diffTime));

    // Time apart (remainder)
    var Remainder = diffTime % frequencyTime;
    console.log(Remainder);

    // Minute Until Train
    var MinutesTillTrain = frequencyTime - Remainder;
    console.log("minutes untill train: " + MinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(MinutesTillTrain, "minutes");
    console.log("arrival time: " + (nextTrain).format("HH:mm"));
    var nextArrival = nextTrain.format("HH:mm");

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var dateEntered = $('#first-train-input').val();

if (!moment(dateEntered,'HH:mm').isValid()) {
  console.log('Valid Time');
} else {
  console.log('Invalid Time');
}


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequencyTime + "</td><td>" + nextArrival + "</td><td>" + MinutesTillTrain + "</td></tr>");
});



