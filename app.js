$(document).ready(function() {

  
  /* Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCx0qx9qgSe0ypvJECi3fKji7cen0aGb7I",
    authDomain: "train2-ee140.firebaseapp.com",
    databaseURL: "https://train2-ee140.firebaseio.com",
    projectId: "train2-ee140",
    storageBucket: "",
    messagingSenderId: "369234953432",
    appId: "1:369234953432:web:468a4367e22bd3f6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);*/


  // firebase link
  var scheduleData = new Firebase("https://train2-ee140.firebaseio.com")

  // add train button
  $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    // user input variables
    var trainName = $("#trainNameInput").val().trim();
    var destinationPoint = $("#destinationInput").val().trim();
    var firstTrainTime = $("#firstTrainInput").val().trim();
    var frequency = $("#firstTrainInput").val().trim();

    //temp object to store input data

    var trainData = {
      name: trainName,
      destination: destinationPoint,
      firstTrain: firstTrainTime,
      frequency: frequency,
    };

    // push to firebase
    scheduleData.push(trainData);

    // console log check

    console.log(trainData.name);
    console.log(trainData.destination);
    console.log(trainData.firstTrain);
    console.log(trainData.frequency);

    // this is how you clear out the values
    trainName = $("#trainNameInput").val("");
    destinationPoint = $("#destinationInput").val("");
    firstTrainTime = $("#firstTrainInput").val("");
    frequency = $("#frequencyInput").val("");

  });

  function trainTable() {
    // event to add train info to database and html
    scheduleData.on("child_added", function(childSnapshot, prevChildKey) {

      var locoName = childSnapshot.val().name;
      var locoDestination = childSnapshot.val().destination;
      var locoFrequency = childSnapshot.val().frequency;
      var locoFirstTrain = childSnapshot.val().firstTrain;

      // var for times
      var firstTimeTransfered = moment(locoFirstTrain, "hh:mm").subtract(1, "years");
        console.log(firstTimeTransfered);
      
      var presentTime = moment();
        console.log("Current Time: " + moment(presentTime).format("hh:mm"));

      var differenceInTimes = moment().diff(moment(firstTimeTransfered), "minutes");
        console.log("Time difference: " + differenceInTimes);

      var timeRemainder = differenceInTimes % locoFrequency;
        console.log(timeRemainder);

      var minutesTilTrain = locoFrequency - timeRemainder;
        console.log("Minutes til train: " + minutesTilTrain);

      var nextTrain = moment().add(minutesTilTrain, "minutes");
        console.log("Next train arrival: " + moment(nextTrain).format("hh:mm"));

      var nextTime = moment(nextTrain).format("hh:mm");

      // append data to table/tafula

      $("tbody").append("<tr><td>" + locoName + "</td><td>" + locoDestination + "</td><td>" + nextTime + "</td><td>" + minutesTilTrain + "</td></tr>");

    })

  }

trainTable();

})