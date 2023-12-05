import { Request, Response } from "express";
import Funcionario, { IFuncionario } from "../model/Funcionario";


class FuncionarioController {
  static criar(req: Request, res: Response) {

    const { nome, dataNascimento, salario, departamento, cpf }  = req.body;

    Funcionario.findOne({ cpf })
        // @ts-ignore
      .then((existingCPF) => {
        if (existingCPF) {
          return res.status(400).json({ message: `O CPF ${existingCPF.cpf} já está em uso!` });
        }

        const newFuncionario: IFuncionario = new Funcionario({
          nome,
          dataNascimento,
          salario,
          departamento,
          cpf,
        });

        return newFuncionario.save();
      })
      .then((savedFuncionario) => {   // @ts - ignore 
        // @ts-ignore
        return res.status(201).json({ message: `Funcionário ${savedFuncionario.nome} salvo com sucesso` });
        
      })
      .catch((err) => {
        return res.status(500).json({ message: `Erro ao criar funcionário: ${err.message}` });
      });
  }


  static encontrarTodos(req: Request, res: Response) {
    Funcionario.find()
      .sort({ nome: 1 }) // Ordena pelo campo 'nome' em ordem ascendente (1) ou descendente (-1)
      .then((todosFuncionarios) => {
        res.status(200).send(todosFuncionarios);
      })
      .catch((error) => {
        res.status(500).send({
          Message: "Erro interno ao buscar todos os funcionários",
          error,
        });
      });
  }

  static encontrarPorId(req: Request, res: Response) {
    const { id } = req.params;

    Funcionario.findById(id)
      .then((funcionario) => {
        if (!funcionario) {
          return res
            .status(404)
            .send({ Message: "Funcionário não encontrado" });
        }
        res.status(200).send(funcionario);
      })
      .catch((error) => {
        res.status(500).send({
          Message: `Erro ao encontrar funcionário por ID: ${error.message}`,
        });
      });
  }

  static encontrarPorDepartamento(req: Request, res: Response) {
    if (!req.params) {
      res.status(400).send({ Message: "Insira um departamento na requisição" });
    }

    const { departamento } = req.params;
    
    Funcionario.find({ departamento: departamento })
      .then((funcionarios) => {
        if (funcionarios.length === 0) {
          return res.status(404).send({
            Message: "Nenhum funcionário encontrado para este departamento",
          });
        }
        res.status(200).send(funcionarios);
      })
      .catch((error) => {
        res.status(500).send({
          Message: `Erro ao encontrar funcionários por departamento: ${error.message}`,
        });
      });
  }

  static encontrarPorNome(req: Request, res: Response) {
    const { nome } = req.params;
    const regex = new RegExp(nome, "i");

    Funcionario.find({ nome: { $regex: regex } })
      .then((funcionarios) => {
        res.status(200).send(funcionarios);
      })
      .catch((error) => {
        res.status(500).send({
          Message: `Erro ao encontrar funcionários por nome: ${error.message}`,
        });
      });
  }
  static atualizar(req: Request, res: Response) {

    const { nome, dataNascimento, salario, departamento, cpf, _id } = req.body;

    console.log(`O usuário com o id ${_id} foi modificado `)

    const camposParaAtualizar: Partial<IFuncionario> = {};

    if (nome) camposParaAtualizar.nome = nome;
    if (dataNascimento) camposParaAtualizar.dataNascimento = dataNascimento;
    if (salario) camposParaAtualizar.salario = salario;
    if (departamento) camposParaAtualizar.departamento = departamento;
    if (cpf) camposParaAtualizar.cpf = cpf;

    Funcionario.findOneAndUpdate({ _id: _id }, camposParaAtualizar, {
      new: true,
    })
      .then((funcionarioAtualizado) => {
        if (!funcionarioAtualizado) {
          return res
            .status(404)
            .send({ Message: "Funcionário não encontrado para atualizar" });
        }
        res.status(200).send({
          Message: `Funcionário ${funcionarioAtualizado.nome} atualizado com sucesso!`,
        });
      })
      .catch((error) => {
        res
          .status(500)
          .send({ Message: `Erro ao atualizar funcionário: ${error.message}` });
      });
  }

  static deletar(req: Request, res: Response) {
    const { id } = req.params;

    Funcionario.findByIdAndDelete(id)
      .then((funcionarioDeletado) => {
        if (!funcionarioDeletado) {
          return res
            .status(404)
            .send({ Message: "Funcionário não encontrado para deletar" });
        }
        res.status(200).send(`Funcionário deletado com sucesso!`);
      })
      .catch((error) => {
        res
          .status(500)
          .send({ Message: `Erro ao deletar funcionário: ${error.message}` });
      });
  }
}

export default FuncionarioController;
