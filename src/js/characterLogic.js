const rangeInput = document.getElementById("passwordCharacterCount")
const numberInput = document.getElementById("passwordCharacterCountManual")

rangeInput.addEventListener("input", (e) => {
    numberInput.value = e.target.value;
});

numberInput.addEventListener("input", (e) => {
    rangeInput.value = e.target.value;
});
