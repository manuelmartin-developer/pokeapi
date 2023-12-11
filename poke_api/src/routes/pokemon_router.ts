import { Router } from "express";
import {
  getAllPokemons,
  getPokemonById
} from "../controllers/pokemon_controller";

const pokemonRouter = Router();

// GET
pokemonRouter.get("/", getAllPokemons);
pokemonRouter.get("/:id", getPokemonById);

export default pokemonRouter;
