const form = document.getElementById("password-form");

form.addEventListener("submit", (e) => {
	e.preventDefaulta();
	console.log("Form submitted");
});
