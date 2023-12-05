
const dominio = 'http://localhost:3001'

export const getFuncionarios = `${dominio}/funcionarios/`
export const criarFuncionario = `${dominio}/funcionario/criar` // req.body
export const encontrarFuncionarioPorNome = `${dominio}/funcionario/nome` // req.params >> ID
export const encontrarPorDepartamento = `${dominio}/funcionarios/departamento` // req.params
export const atualizarFuncionario = `${dominio}/funcionario/atualizar` // req.body
export const deletarFuncionario = `${dominio}/funcionario/excluir` // req.params >> ID

