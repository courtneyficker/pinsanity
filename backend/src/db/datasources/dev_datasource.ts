// We need dotenv here because our datasources are processed from CLI in addition to vite
import dotenv from "dotenv";
import { DataSource } from 'typeorm';
// Similar reasoning as above, we need to add the file extensions to this file's imports for CLI usage
import { User } from "../models/user";
import { IPHistory } from "../models/ip_history";
import { Initial1677923374030 } from "../migrations/1677923374030-Initial";
import { Category } from "../models/category";
import { AddCategory1677931287155 } from "../migrations/1677931287155-AddCategory";
import { Company } from "../models/company";
import { AddCompany1677931746347 } from "../migrations/1677931746347-AddCompany";
import { Type } from "../models/type";
import { AddType1677931945695 } from "../migrations/1677931945695-AddType";
import { Pin } from "../models/pin";
import { AddPin1677960304685 } from "../migrations/1677960304685-AddPin";
import { List } from "../models/list";
import { AddList1678158045551 } from "../migrations/1678158045551-AddList";
import { addImageToPins1679402051033 } from "../migrations/1679402051033-addImageToPins";


dotenv.config();

// @ts-ignore
const env = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.VITE_DB_HOST,
    port: Number(env.VITE_DB_PORT),
    username: env.VITE_DB_USER,
    password: env.VITE_DB_PASS,
    database: env.VITE_DB_NAME,
    // entities are used to tell TypeORM which tables to create in the database
    entities: [
        User,
        IPHistory,
        Category,
        Company,
        Type,
        Pin,
        List,
    ],
    migrations: [
        Initial1677923374030,
        AddCategory1677931287155,
        AddCompany1677931746347,
        AddType1677931945695,
        AddPin1677960304685,
        AddList1678158045551,
        addImageToPins1679402051033,
    ],
    // DANGER DANGER our convenience will nuke production data!
    synchronize: false
});
