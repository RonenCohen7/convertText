import dotenv from "dotenv"

dotenv.config({ quiet: true });

class AppConfig {
    public readonly isDevelopment = process.env.NODE_ENV === "development";
    public readonly isProduction = process.env.NODE_ENV === "production";


    public readonly host = process.env.HOST;
    public readonly user = process.env.USER;
    public readonly password = process.env.PASSWORD;
    public readonly database = process.env.DATABASE
    public readonly port = Number(process.env.PORT) || 4000;
    public readonly mongodbConnectionString = process.env.MONGO_CONNECTION_STRING!;

}


export const appConfig = new AppConfig();