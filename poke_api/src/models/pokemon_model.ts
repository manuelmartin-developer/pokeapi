import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: "pokemons" })
export class Pokemon extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.JSON, allowNull: false })
  type!: string[];

  @Column({ type: DataType.STRING, allowNull: false })
  height!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  weight!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image!: string;

  @Column({ type: DataType.JSON, allowNull: true })
  evolution!: {};
}

export default Pokemon;
