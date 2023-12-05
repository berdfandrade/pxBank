import express from 'express';
import FuncionarioController from '../controller/FuncionarioController';

const router = express.Router();

router
  .get('/funcionarios', FuncionarioController.encontrarTodos)
  .get('/funcionario/id/:id', FuncionarioController.encontrarPorId)
  .post('/funcionario/criar', FuncionarioController.criar)
  .get('/funcionarios/departamento/:departamento', FuncionarioController.encontrarPorDepartamento)
  .post('/funcionario/atualizar/', FuncionarioController.atualizar)
  .delete('/funcionario/excluir/:id', FuncionarioController.deletar)
  .get('/funcionario/nome/:nome', FuncionarioController.encontrarPorNome)

export default router;
