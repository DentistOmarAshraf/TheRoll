import express from "express";

const app = express();

app.get("/hi",async (req, res) => {
  const {name} = req.query
  console.log(name)
  console.log("requested");
  return res.status(200).json({ hi: "there" });
});

app.listen(8080, "0.0.0.0", () => {
  console.log("server run");
});
