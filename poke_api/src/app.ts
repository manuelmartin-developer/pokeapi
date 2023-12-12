require("dotenv").config(); // Environment variables
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import sequelizeConnection from "./database";
import pokemonRouter from "./routes/pokemon_router";
import { initialData } from "./database/initial_data";
import { Pokemon } from "./models/pokemon_model";

// Express app
const app: Application = express();
app.use(express.json()); // for parsing application/json
app.use(
  express.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded
const corsOpts = {
  origin: ["http://localhost:5173", "http://localhost:4173"],
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"]
}; // CORS options
app.use(cors(corsOpts)); // CORS
app.use(express.static("public")); // static files

// Routes
app.use(`${process.env.API_BASE_PATH}/pokemon`, pokemonRouter);

//error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error: " + error.message);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Add initial data from json file and start server
sequelizeConnection
  .sync({ force: true })
  .then(() => {
    console.log("Conectado a la base de datos");
    initialData.map(async (pokemon: any) => {
      const parsedPokemon = {
        name: pokemon.name.english,
        description: pokemon.description,
        type: pokemon.type,
        profile: pokemon.profile,
        base: pokemon.base,
        image: pokemon.image.hires,
        evolutedFrom:
          (pokemon.evolution &&
            pokemon.evolution.prev &&
            pokemon.evolution.prev.length &&
            initialData.find(
              (p: any) => p.id === Number(pokemon.evolution.prev[0])
            )?.name.english) ||
          null
      };
      await Pokemon.create(parsedPokemon);
    });
    console.log("Datos iniciales añadidos");
    app.listen(3000, () => {
      console.log("Pokemon corriendo por el puerto 3000");
    });
  })
  .catch((error: any) => console.log(error));
