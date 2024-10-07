import passwordGenerator from "./passwordGenerator.js";

export default function handler(req, res) {
  if (req.method === "POST") {
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
      res.status(200).send(password);
    } catch (error) {
      console.error("Error processing request", error);
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
