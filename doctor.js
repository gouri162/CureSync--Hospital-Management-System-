let nextPatientBtn = document.getElementById("nextPatientBtn");

nextPatientBtn.addEventListener("click", function () {

    // Replace this with however you're tracking the current patient's name
    // e.g. from your appointments queue for today
    let currentPatientName = "Rohan Verma"; // example — pull dynamically from your queue array

    localStorage.setItem("currentPatient", currentPatientName);

    alert(currentPatientName + " is now In Consultation.");

});
// Todays Appointment
let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

let loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

let doctorAppointments = appointments.filter(function (appointment) {

    return appointment.doctor.toLowerCase() ===
           loggedInUser.name.toLowerCase();

});
