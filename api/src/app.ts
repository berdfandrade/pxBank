import express from "express";
import connectDB from "./dbConfig/mongoDBConfig";
import routes from "./routes";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("dev"));

connectDB();

const PORT = process.env.PORT || 3001;

routes(app);

app.listen(PORT, () => {
  console.log(`Ouvindo o servidor na porta ${PORT}`);
});
