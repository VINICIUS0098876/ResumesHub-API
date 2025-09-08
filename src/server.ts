import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";        // Certifique-se que routes.ts está em src/
import { setupSwagger } from "./document/swagger";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas da API
app.use(routes);

// Swagger
setupSwagger(app);

// Porta
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
