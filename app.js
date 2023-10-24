const express = require("express");
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static("public"));

app.get("/asd", (req, res) => {
  fetch("https://ipinfo.io/json")
    .then((response) => response.json())
    .then((data) => {
      const { loc } = data;
      const [latitude, longitude] = loc.split(",");
      setLocation({ latitude, longitude });

      // Hacer una solicitud a la API de clima utilizando la ubicación
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1]);
        })
        .catch((error) => {
          console.error("Error al obtener datos de clima:", error);
        });
    })
    .catch((error) => {
      console.error("Error al obtener ubicación basada en IP:", error);
    });

  // Obtener noticias
  fetch("https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=f7267ad5dea0459cb132e5b92ab747d0")
    .then((response) => response.json())
    .then((data) => {
      setNews(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al obtener noticias:", error);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
