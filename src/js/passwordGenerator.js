export default function passwordGenerator(
	characterCount,
	includesUpperCase,
	includeLowerCase,
	includeNumbers,
	includeSymbols
) {
	let password = [];
    let allowedCharacters = [];
    let guaranteedCharacters = [];
	const characters = {
		lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
		uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
		numbers: "0123456789".split(""),   
		symbols: "!@#$%^&*()_+".split(""),
	};

    if (includesUpperCase) {
        allowedCharacters = allowedCharacters.concat(characters.uppercase);
        guaranteedCharacters.push(getRandomCharacterFromArray(characters.uppercase));
    } 
    if (includeLowerCase) {
        allowedCharacters = allowedCharacters.concat(characters.lowercase);
        guaranteedCharacters.push(getRandomCharacterFromArray(characters.lowercase));
    }
    if (includeNumbers) {
        allowedCharacters = allowedCharacters.concat(characters.numbers);
        guaranteedCharacters.push(getRandomCharacterFromArray(characters.numbers));
    } 
    if (includeSymbols) {
        allowedCharacters = allowedCharacters.concat(characters.symbols);
        guaranteedCharacters.push(getRandomCharacterFromArray(characters.symbols));
    }
    if (includesUpperCase === false && includeLowerCase === false && includeNumbers === false && includeSymbols === false) {
        return ":(";
    }
    for (let i = 0; i < characterCount - guaranteedCharacters.length; i++ ) {
        password.push(allowedCharacters[getRandomCharacter(allowedCharacters.length)]);
    }
    password = password.concat(guaranteedCharacters);

    shuffleArray(password);

    return password.join("");
}

// Helper functions

// Returns a random number between 0 and length
function getRandomCharacter(length) {
    return Math.floor(Math.random() * length);
}

// Returns a random character from an array
function getRandomCharacterFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffles string characters using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * i + 1); 
        [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
}
