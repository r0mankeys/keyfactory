const themeButton = document.getElementById("colour-mode");
const themeIcon = document.getElementById("theme-icon");
const passwordOutput = document.getElementById("password-field");
const copyButton = document.getElementById("copy-password");
const copyIcon = document.getElementById("copy-icon");
const rangeInput = document.getElementById("passwordCharacterCount");
const numberInput = document.getElementById(
	"passwordCharacterCountManual"
);
const includeUpperCase = document.getElementById("uppercase");
const includeLowerCase = document.getElementById("lowercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");
const form = document.getElementById("password-form");

// Toggle colour theme
const setTheme = (theme) => {
	document.body.className = theme;
};

const darkMediaQuery = window.matchMedia(
	"(prefers-color-scheme: dark)"
); // Boolean

// Set initial theme based on user's system preference
if (darkMediaQuery.matches) {
	setTheme("dark");
	themeIcon.src = "./assets/Light-mode-icon.svg";
} else {
	setTheme("light");
	themeIcon.src = "./assets/Dark-mode-icon.svg";
}

themeButton.addEventListener("click", () => {
	if (document.body.className === "dark") {
		setTheme("light");
		themeIcon.src = "./assets/Dark-mode-icon.svg";
		copyIcon.src = "./assets/Light-copy.svg";
	} else {
		setTheme("dark");
		themeIcon.src = "./assets/Light-mode-icon.svg";
		copyIcon.src = "./assets/Dark-copy.svg";
	}
});

darkMediaQuery.addEventListener("change", (e) => {
	if (e.matches) {
		setTheme("dark");
		themeIcon.src = "./assets/Light-mode-icon.svg";
		copyIcon.src = "./assets/Dark-copy.svg";
	} else {
		setTheme("light");
		themeIcon.src = "./assets/Dark-mode-icon.svg";
		copyIcon.src = "./assets/Light-copy.svg";
	}
});

// Sync range and number inputs
rangeInput.addEventListener("input", (e) => {
	numberInput.value = e.target.value;
});

numberInput.addEventListener("input", (e) => {
	rangeInput.value = e.target.value;
});

// Copy password to clipboard
copyButton.addEventListener("click", () => {
	const password = passwordOutput.textContent;
	if (password.length > 0) {
		navigator.clipboard.writeText(password);
	}
});

// Send form data to server with fetch API and update password field
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const response = await fetch("/api/server", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				characterCount: rangeInput.value,
				includeUpperCase: includeUpperCase.checked,
				includeLowerCase: includeLowerCase.checked,
				includeNumbers: includeNumbers.checked,
				includeSymbols: includeSymbols.checked,
			}),
		});
		const result = await response.text();
		passwordOutput.textContent = result;
	} catch (error) {
		console.error(error);
	}
});
