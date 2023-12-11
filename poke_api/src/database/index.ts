import { Sequelize } from "sequelize-typescript";
import Pokemon from "../models/pokemon_model";
import { initialData } from "./initial_data";

const sequelizeConnection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  database: "poke_api",
  port: 3306,
  username: "root",
  password: "root",
  models: [Pokemon]
});

export default sequelizeConnection;
