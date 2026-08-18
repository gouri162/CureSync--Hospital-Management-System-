// ================= SHOW LOGGED IN USER =================

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {

    let admin = document.getElementById("admin");

    if (admin) {
        admin.innerHTML = `
            <strong>${loggedInUser.name}</strong>
            <small>${loggedInUser.role}</small>
        `;
    }


    let greeting = document.querySelector(".greeting h3");

    if (greeting) {
        greeting.textContent = "Hello! " + loggedInUser.name;
    }

}