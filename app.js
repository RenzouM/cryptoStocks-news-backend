const express = require("express");
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static("public"));

app.get("/asd", (req, res) => {
  res.redirect("http://www.google.com");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
