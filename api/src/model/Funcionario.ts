import { string } from "joi";
import mongoose, { Date, Document, Schema } from "mongoose";

export interface IFuncionario extends Document {
  nome: string;
  dataNascimento: string;
  salario: number;
  departamento: string;
  cpf: string;
}

const FuncionarioSchema = new Schema<IFuncionario>({
  nome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  salario: { type: Number, required: true },
  departamento: { type: String, required: true },
  cpf: { type: String, required: true },
});

const Funcionario = mongoose.model<IFuncionario>(
  "Funcionario",
  FuncionarioSchema
);

export default Funcionario;
