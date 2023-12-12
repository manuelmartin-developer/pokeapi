import { Table, Model, Column, DataType, Scopes } from "sequelize-typescript";

@Scopes(() => ({
  listScope: {
    attributes: {
      exclude: ["base", "profile", "description", "createdAt", "updatedAt"]
    }
  }
}))
@Table({ tableName: "pokemons" })
export class Pokemon extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string;

  @Column({ type: DataType.JSON, allowNull: false })
  type!: string[];

  @Column({ type: DataType.JSON, allowNull: false })
  profile!: {};

  @Column({ type: DataType.JSON, allowNull: false })
  base!: {};

  @Column({ type: DataType.STRING, allowNull: false })
  image!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  evolutedFrom!: string;
}

export default Pokemon;
