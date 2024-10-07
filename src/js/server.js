import express from "express";
import passwordGenerator from "./passwordGenerator.js";

const app = express();
const port = 3000;

app.use(express.static("src"));
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendStatus(200);
});

app.post("/post", (req, res) => {
	const {
		characterCount,
		includeUpperCase,
		includeLowerCase,
		includeNumbers,
		includeSymbols,
	} = req.body;
	try {
		const password = passwordGenerator(
			characterCount,
			includeUpperCase,
			includeLowerCase,
			includeNumbers,
			includeSymbols
		);
		res.send(password);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
