import express from "express";
import passwordGenerator from "./passwordGenerator.js";
import cors from "cors";

const app = express();

app.use(express.static("../src"));
app.use(express.static("../assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.sendStatus(200);
});

app.post("/api/server", (req, res) => {
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
