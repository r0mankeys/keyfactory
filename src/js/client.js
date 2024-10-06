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

// Copy password to clipboard
copyButton.addEventListener("click", () => {
	const password = passwordOutput.textContent;
	if (password.length > 0) {
		navigator.clipboard.writeText(password);
	}
});

// Change button icon based on colour theme
const updateCopyIcon = () => {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        copyIcon.src = "Light-copy.svg";
    } else {
        copyIcon.src = "Dark-copy.svg";
    }
};

// Initial icon update
updateCopyIcon();

// Listen for changes in the color scheme
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", updateCopyIcon);
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateCopyIcon);

// Sync range and number inputs
rangeInput.addEventListener("input", (e) => {
	numberInput.value = e.target.value;
});

numberInput.addEventListener("input", (e) => {
	rangeInput.value = e.target.value;
});

// Send form data to server with fetch API and update password field
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const response = await fetch("/post", {
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
