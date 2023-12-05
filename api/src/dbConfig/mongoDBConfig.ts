import mongoose from "mongoose";

const user = "admin-pxBank";
const password = "kPUwkk8eRdYw5Uk5";

export default function connectDB() {
  const uri = `mongodb+srv://${user}:${password}@cluster-funcionarios.khqhuzq.mongodb.net/?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conexão com o MongoDB estabelecida!");
    })
    .catch((error) => {
      console.error("Erro ao conectar ao MongoDB:", error);
    });
}
