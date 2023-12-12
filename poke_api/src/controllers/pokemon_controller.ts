import { Request, Response, NextFunction } from "express";
import { Pokemon } from "../models/pokemon_model";
import { Op } from "sequelize";

// get all pokemons
export const getAllPokemons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { size, page, search } = req.query;

    const pokemons = await Pokemon.scope("listScope").findAndCountAll({
      limit: size ? Number(size) : 10,
      offset: page ? (Number(page) - 1) * Number(size) : 0,
      where: {
        ...(search && {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`
              }
            }
          ]
        })
      },
      order: [["id", "ASC"]]
    });

    res.status(200).json({
      total: pokemons.count,
      hasMorePages: pokemons.count > Number(size) * Number(page),
      pokemons: pokemons.rows
    });
  } catch (error) {
    next(error);
  }
};

// get pokemon by id
export const getPokemonById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id);
    if (pokemon) {
      res.status(200).json({ pokemon });
    } else {
      res.status(404).json({ message: "El pokemon ha huído" });
    }
  } catch (error) {
    next(error);
  }
};
