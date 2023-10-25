const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static("public"));

const corsOptions = {
  origin: "https://renzoum.github.io/cryptoStock-News/#/", // Reemplaza esto con la dirección correcta de tu frontend
};

app.use(cors(corsOptions));
//asdsd

app.get("/news", async (req, res) => {
  try {
    const newsResponse = await fetch("https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=f7267ad5dea0459cb132e5b92ab747d0");
    const newsData = await newsResponse.json();
    res.json(newsData);
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener noticias" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
