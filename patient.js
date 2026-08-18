// ================= BOOK APPOINTMENT =================

// Book Appointment button
let bookAppointment = document.getElementById("bookAppointment");

// Modal
let appointmentModal = document.getElementById("appointmentModal");


// Form
let appointmentForm = document.getElementById("appointmentForm");

// Form fields
let patientName = document.getElementById("patientName");
let patientAge = document.getElementById("patientAge");
let appointmentDoctor = document.getElementById("appointmentDoctor");
let appointmentTime = document.getElementById("appointmentTime");

// Error message
let appointmentError = document.getElementById("appointmentError");

let isBooked = false;
// ================= CLOSE MODAL =================

let closeAppointment = document.getElementById("closeAppointment");

closeAppointment.addEventListener("click", function () {
    appointmentModal.classList.remove("active");
    appointmentForm.reset();
    appointmentError.textContent = "";
});

// Click outside the box to close
appointmentModal.addEventListener("click", function (e) {
    if (e.target === appointmentModal) {
        appointmentModal.classList.remove("active");
        appointmentForm.reset();
        appointmentError.textContent = "";
    }
});

// Escape key to close
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && appointmentModal.classList.contains("active")) {
        appointmentModal.classList.remove("active");
        appointmentForm.reset();
        appointmentError.textContent = "";
    }
});


// ================= DOCTORS =================

// These are the doctors available for booking

let doctors = [
    "Dr. Ananya Sharma",
    "Dr. Rahul Mehta",
    "Dr. Priya Kapoor"
];


// Put doctors inside dropdown

for (let doctor of doctors) {

    appointmentDoctor.innerHTML += `
        <option value="${doctor}">
            ${doctor}
        </option>
    `;

}


// ================= OPEN BOOKING =================

bookAppointment.addEventListener("click", function (e) {

    e.preventDefault();

    // Check login
    let loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {

        alert("Please login first to book an appointment.");

        return;
    }

    // Open popup
    appointmentModal.classList.add("active");

});


// ================= SUBMIT APPOINTMENT =================

appointmentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let name = patientName.value.trim();
    let age = patientAge.value.trim();
    let doctor = appointmentDoctor.value;
    let time = appointmentTime.value;


    // Check fields

    if (
        name === "" ||
        age === "" ||
        doctor === "" ||
        time === ""
    ) {

        appointmentError.textContent =
            "Please fill in all the fields.";

        return;
    }


    // ================= GET OLD APPOINTMENTS =================

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];


    // ================= CHECK DOUBLE BOOKING =================

    let alreadyBooked = appointments.some(function (appointment) {

        return (
            appointment.doctor === doctor &&
            appointment.time === time
        );

    });


    if (alreadyBooked) {

        appointmentError.textContent =
            "This doctor already has an appointment at this time.";

        return;
    }


    // ================= CREATE APPOINTMENT =================

    let newAppointment = {

        name: name,
        age: age,
        doctor: doctor,
        time: time

    };


    // Add appointment

    appointments.push(newAppointment);


    // Save to localStorage

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    // Success

    alert("Appointment booked successfully!");


    // Close popup

    appointmentModal.classList.remove("active");

    appointmentForm.reset();

    appointmentError.textContent = "";

    isBooked = true;

    updateStep1();

});

// progress barrrr
// Step 1~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let AppointmentBooked = document.getElementById("AppBooked");

function updateStep1() {
    if (isBooked) {
        AppointmentBooked.classList.remove("upcoming");
        AppointmentBooked.classList.add("completed");
    }
}
