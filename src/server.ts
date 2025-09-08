import Express from "express";
import cors from "cors";
import BodyParser from "body-parser";
import routes from './routes';

const app = Express();

const start = async function(){
    await app.use(cors());
    await app.use(BodyParser.json());
    await app.use(routes);
    await app.use(BodyParser.json());

    const PORT = process.env.PORT || 3000;

    try {
        await app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log("Error starting server:", error);
        process.exit(1);
    }
}

start();