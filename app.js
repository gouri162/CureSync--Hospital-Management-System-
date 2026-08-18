let admin = document.getElementById("admin");
let notif = document.getElementById("notification");
let doctorList = document.getElementById("doctorList");

let isLoggedIn = false;

let doctors = [
    {name: "Dr. Ananya Sharma", available: true},
    {name: "Dr. Rahul Mehta", available: true},
    {name: "Dr. Priya Kapoor", available: true}
];


// Display doctors
function displayDoctors() {

    doctorList.innerHTML = "";

    for(let doctor of doctors) {

        doctorList.innerHTML += `
            <div class="doctor-status">
                <div>
                    <span class="status-dot available"></span>
                    <span>${doctor.name}</span>
                </div>

                <strong>Available</strong>
            </div>
        `;
    }
}


// ================= LOGIN ELEMENTS =================

let adminLogin = document.getElementById("adminLogin");
let closeLogin = document.getElementById("closeLogin");
let adminLoginForm = document.getElementById("adminLoginForm");

let adminUsername = document.getElementById("adminUsername");
let adminRole = document.getElementById("adminRole");
let adminPassword = document.getElementById("adminPassword");

let loginError = document.getElementById("loginError");

// Get the Welcome text from HTML
let Adminname = document.getElementById("Adminname");


// ================= LOGIN / LOGOUT =================

admin.addEventListener("click", function () {

    if (isLoggedIn) {

        let logout = confirm("Do you want to logout?");

        if (logout) {

            // Remove current login from localStorage
            localStorage.removeItem("loggedInUser");

            isLoggedIn = false;

            // Reset Admin button
            admin.innerHTML = `
                <strong>Admin</strong>
                <small>Super Admin</small>
            `;

            // Reset Welcome message
            Adminname.innerText = "Welcome, Admin!";

            alert("You have successfully logged out!");
        }

    } else {

        // Open login popup
        adminLogin.classList.add("active");

        adminUsername.focus();
    }

});


// ================= CLOSE LOGIN =================

closeLogin.addEventListener("click", function () {

    adminLogin.classList.remove("active");

    adminLoginForm.reset();

    loginError.textContent = "";

});


// ================= LOGIN =================

adminLoginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let username = adminUsername.value.trim();
    let role = adminRole.value;
    let password = adminPassword.value.trim();


    // ================= CHECK EMPTY FIELDS =================

    if (username === "" || role === "" || password === "") {

        loginError.textContent =
            "Please fill in all the fields.";

        return;
    }


    // ================= SAVE LOGGED-IN USER =================

    let user = {
        name: username,
        role: role
    };

    // Save user information in localStorage
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );

    isLoggedIn = true;


    // ================= UPDATE WELCOME MESSAGE =================

    // Show the person's name instead of "Admin"
    Adminname.innerText = "Welcome, " + username + "!";


    // ================= ADMIN =================

    if (role === "admin") {

        admin.innerHTML = `
            <strong>${username}</strong>
            <small>Super Admin</small>
        `;

    }


    // ================= DOCTOR =================

    else if (role === "doctor") {

        let doctorName = username;

        // Add Dr. automatically
        if (!doctorName.toLowerCase().startsWith("dr.")) {

            doctorName = "Dr. " + doctorName;

        }

        // Check whether doctor already exists
        let doctorExists = doctors.some(function (doctor) {

            return doctor.name.toLowerCase() ===
                   doctorName.toLowerCase();

        });

        // Add doctor only if not already present
        if (!doctorExists) {

            doctors.push({
                name: doctorName,
                available: true
            });

        }

        admin.innerHTML = `
            <strong>${username}</strong>
            <small>Doctor</small>
        `;

        displayDoctors();
    }


    // ================= PATIENT =================

    else if (role === "patient") {

        admin.innerHTML = `
            <strong>${username}</strong>
            <small>Patient</small>
        `;

    }


    // ================= CLOSE LOGIN =================

    adminLogin.classList.remove("active");

    adminLoginForm.reset();

    loginError.textContent = "";

    alert("You have successfully logged in to CureSync!");

});


// ================= RESTORE LOGIN AFTER REFRESH =================

// Get saved user from localStorage
let loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);


// If a user was already logged in
if (loggedInUser) {

    isLoggedIn = true;

    // Restore Admin button
    admin.innerHTML = `
        <strong>${loggedInUser.name}</strong>
        <small>${loggedInUser.role}</small>
    `;

    // Restore Welcome message
    Adminname.innerText =
        "Welcome, " + loggedInUser.name + "!";

}


// ================= NOTIFICATION =================

notif.addEventListener("click", function () {

    if (isLoggedIn) {

        alert("You have successfully logged in to CureSync!");

    }
    else {

        alert("Please login first!");

    }

});


displayDoctors();
// ================= APPOINTMENT =================

let bookApp = document.getElementById("bookAppointment");
let appointmentList = document.getElementById("appointmentList");
let viewSchedule = document.getElementById("viewSchedule");

let appointmentModal = document.getElementById("appointmentModal");
let closeAppointment = document.getElementById("closeAppointment");

let appointmentForm = document.getElementById("appointmentForm");

let patientName = document.getElementById("patientName");
let patientAge = document.getElementById("patientAge");
let appointmentTime = document.getElementById("appointmentTime");
let appointmentDoctor = document.getElementById("appointmentDoctor");

let appointmentError = document.getElementById("appointmentError");


// ================= EXISTING APPOINTMENTS =================

// Get appointments booked from Patient Page
let Appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];





// ================= CLOSE APPOINTMENT MODAL =================

closeAppointment.addEventListener("click", function () {

    appointmentModal.classList.remove("active");

    appointmentForm.reset();

    appointmentError.textContent = "";

});


// ================= DISPLAY DOCTORS IN DROPDOWN =================

function displayDoctorOptions() {

    appointmentDoctor.innerHTML = `
        <option value="" disabled selected>
            Select doctor
        </option>
    `;


    for (let doctor of doctors) {

        if (doctor.available) {

            appointmentDoctor.innerHTML += `
                <option value="${doctor.name}">
                    ${doctor.name}
                </option>
            `;

        }

    }

}
// ================= DOCTOR DIRECTORY =================

let doctorDirectory = document.getElementById("doctorDirectory");

doctorDirectory.addEventListener("click", function () {

    if (doctorDirectory.dataset.expanded !== "true") {

        displayDoctors(true);

        doctorDirectory.dataset.expanded = "true";

        doctorDirectory.innerHTML = `
            Show Less
            <i class="fa-solid fa-arrow-up"></i>
        `;

    } else {

        displayDoctors(false);

        doctorDirectory.dataset.expanded = "false";

        doctorDirectory.innerHTML = `
            Doctor Directory
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }

});


// Initial state

doctorDirectory.dataset.expanded = "false";

displayDoctors(false);


// ================= BOOK APPOINTMENT =================


bookApp.addEventListener("click", function (e) {

    e.preventDefault();

    if (!isLoggedIn) {

        alert("Please login first to book an appointment.");

        return;
    }

    // Only logged-in users reach here
    appointmentModal.classList.add("active");

    appointmentError.textContent = "";

    displayDoctorOptions();

});

appointmentForm.addEventListener("submit", function (e) {

    e.preventDefault();


    let name = patientName.value.trim();
    let age = patientAge.value.trim();
    let time = appointmentTime.value;
    let doctor = appointmentDoctor.value;


    // Check empty fields

    if (
        name === "" ||
        age === "" ||
        time === "" ||
        doctor === ""
    ) {

        appointmentError.textContent =
            "Please fill in all the fields.";

        return;

    }


    // ================= CHECK SAME DOCTOR + SAME TIME =================

    let alreadyBooked = Appointments.some(function (appointment) {

        return (
            appointment.doctor.toLowerCase() ===
            doctor.toLowerCase()
            &&
            appointment.time === time
        );

    });


    if (alreadyBooked) {

        appointmentError.textContent =
            doctor +
            " already has an appointment at " +
            time +
            ". Please choose another time.";

        return;

    }


    // ================= CREATE APPOINTMENT =================

    let appointment = {

        name: name,
        age: age,
        time: time,
        doctor: doctor

    };


    Appointments.push(appointment);

    // Save updated appointments to localStorage
    localStorage.setItem(
    "appointments",
    JSON.stringify(Appointments)
    );


    // Update dashboard

    displayAppointments();


    alert("Appointment booked successfully!");


    // Close modal

    appointmentModal.classList.remove("active");

    appointmentForm.reset();

    appointmentError.textContent = "";

});


// ================= DISPLAY APPOINTMENTS =================

function displayAppointments(showAll = false) {

    appointmentList.innerHTML = "";

    let appointmentsToShow;

    if (showAll) {
        appointmentsToShow = Appointments;
    } else {
        appointmentsToShow = Appointments.slice(0, 3);
    }


    for (let app of appointmentsToShow) {

        appointmentList.innerHTML += `

            <div class="appointment-item">

                <div class="appointment-time">
                    <strong>${app.time}</strong>
                </div>

                <div class="appointment-info">
                    <strong>${app.name}</strong>

                    <small>
                        ${app.doctor} • Age: ${app.age}
                    </small>
                </div>

                <span class="appointment-status">
                    Upcoming
                </span>

            </div>

        `;
    }


    // Only control View Schedule
    // NEVER hide Book Appointment

    if (Appointments.length > 3) {

        viewSchedule.style.display = "block";

    } else {

        viewSchedule.style.display = "none";

    }
}


// ================= VIEW SCHEDULE =================

viewSchedule.addEventListener("click", function () {

    if (viewSchedule.dataset.expanded !== "true") {

        displayAppointments(true);

        viewSchedule.dataset.expanded = "true";

        viewSchedule.innerHTML = `
            Show Less
            <i class="fa-solid fa-arrow-up"></i>
        `;

    } else {

        displayAppointments(false);

        viewSchedule.dataset.expanded = "false";

        viewSchedule.innerHTML = `
            View Schedule
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }

});


// ================= INITIAL DISPLAY =================

viewSchedule.dataset.expanded = "false";

displayAppointments(false);
// ================= CALENDAR =================

let calendar = document.querySelector(".calendar");
let currentDate = document.getElementById("currentDate");


// Show today's date

let today = new Date();

let options = {
    day: "numeric",
    month: "short",
    year: "numeric"
};

currentDate.textContent =
    today.toLocaleDateString("en-GB", options);


// Calendar click

calendar.addEventListener("click", function () {

    let dateInput = document.createElement("input");

    dateInput.type = "date";

    dateInput.style.position = "absolute";
    dateInput.style.opacity = "0";

    document.body.appendChild(dateInput);

    dateInput.addEventListener("change", function () {

        let selectedDate = new Date(this.value);

        currentDate.textContent =
            selectedDate.toLocaleDateString("en-GB", options);

        dateInput.remove();

    });

    dateInput.click();

});