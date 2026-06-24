import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import { comparisonController } from "./controllers/comparisons-controller";
import { documentController } from "./controllers/documents-controller";
import { appConfig } from "./utils/app-config";
import { errorMiddleware } from "./middleware/errors-middleware";

class App {


    public async start(): Promise<void> {
        try {
            await mongoose.connect(appConfig.mongodbConnectionString);

            const server = express();
            server.use(cors())


            server.use(express.json());
            server.use(fileUpload());

            server.use(documentController.router);
            server.use(comparisonController.router);

            //Test route
            server.get("/", (request, response) => {
                response.send("ConvertText API is running")
            })


            //Run server
            server.listen(appConfig.port, () => {
                console.log("Listening on http://localhost:" + appConfig.port);

            })


            server.use(errorMiddleware.routeNotFound);
            server.use(errorMiddleware.catchAll);

        }
        catch (err: any) {
            console.error(err);


        }
    }
}


const app = new App();
app.start()
