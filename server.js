require("dotenv").config();
const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.post("/api/generate", async (req, res) => {
  try {
    const { documentType, fullName, address, date, details } = req.body || {};

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "Gemini API key is not configured. Use the built-in demo mode."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are assisting with a student software prototype called LegalEase.
Generate a clearly labelled DRAFT legal document based on the following information.
Do not claim it is legally valid or substitute for a lawyer. Do not invent laws,
case numbers, signatures, official seals, or legal authorities.

Document type: ${documentType}
Name: ${fullName}
Address: ${address}
Date: ${date}
User details: ${details}

Return a professional plain-text draft with a title, sections, placeholders where
information is missing, and a short "Draft / Review Required" note.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ document: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed." });
  }
});

app.listen(PORT, () => {
  console.log(`LegalEase running at http://localhost:${PORT}`);
});
