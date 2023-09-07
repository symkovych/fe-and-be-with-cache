import express from "express";
import fetch from "node-fetch";
import { cache } from "./cache";
import { baseURL, headerOptions } from "../constans";

const app = express();
const port = 3001;

app.get(
  "/fetchMovies",
  cache(),
  (req: express.Request, res: express.Response, next) => {
    const movieURL = `${baseURL}&page=${req.query.page}&query=${req.query.query}`;
    fetch(movieURL, headerOptions)
      .then((response) => response.json())
      .then((json) => res.send(json))
      .catch((err) => {
        next(err);
      });
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
