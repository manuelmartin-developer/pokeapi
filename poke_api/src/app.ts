import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

// Express app
const app: Application = express();
app.use(express.json()); // for parsing application/json
app.use(
  express.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded
const corsOpts = {
  origin: ["http://localhost:5173"],
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"]
}; // CORS options
app.use(cors(corsOpts)); // CORS
app.use(express.static("public")); // static files

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Poke API!");
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
