import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/weather", async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).send("Missing latitude and/or longitude query parameters");
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching weather data." });
    }
});

app.get("/search", async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).send("Missing search query parameter");
    }

    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});