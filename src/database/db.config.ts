import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
    type: "mysql",
    host : "localhost",
    port: 3306,
    username: "root",
  password: "",
  database: "ts-blogs",
  entities: [path.join(__dirname,"..","entites/*{.ts,.js}")],
  synchronize: true,
  logging: true,
});