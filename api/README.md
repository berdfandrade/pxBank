# PX Bank - CRUD - API

Para iniciar a API:

```
cd api 
npm install 
npm start 
```




## Descrição

API CRUD de funcionários feita com Node, Express, MongoDB e Mongoose. 


## Configuração

Certifique-se de ter o Node.js instalado na sua máquina.

```
cd api 
npm install 
```

2. Configuração do banco de dados:
   
   - Certifique-se de ter as configurações corretas do banco de dados no arquivo `dbConfig/mongoDBConfig`.
   - Se necessário, ajuste as variáveis de ambiente ou arquivos de configuração para se conectar ao seu banco de dados.

## Executando a API

Para iniciar a API, use o seguinte comando:

```bash
npm start
```

Isso iniciará o servidor na porta especificada (por padrão, na porta 3001).

## Endpoints

### GET /api/funcionarios

- Descrição: Retorna todos os funcionários.
- Exemplo: `http://localhost:3001/api/funcionarios`

### GET /api/funcionario/id/:id

- Descrição: Retorna um funcionário por ID.
- Exemplo: `http://localhost:3001/api/funcionario/id/123`

### GET /api/funcionario/nome/:nome

- Descrição: Retorna um funcionário por nome.
- Exemplo: `http://localhost:3001/api/funcionario/nome/Joao`

### POST /api/funcionario/criar

- Descrição: Cria um novo funcionário.
- Exemplo do corpo da requisição:
  
  ```json
  {
    "nome": "Novo Funcionário",
    "departamento": "TI",
    "cargo": "Desenvolvedor"
    // outros campos...
  }
  ```

### POST /api/funcionario/atualizar

- Descrição: Atualiza um funcionário.
- Exemplo do corpo da requisição:
  
  ```json
  {
    "id": "123",
    "nome": "Novo Nome",
    "departamento": "Vendas",
    "cargo": "Gerente"
    // outros campos a serem atualizados...
  }
  ```

### DELETE /api/funcionario/excluir/:id

- Descrição: Exclui um funcionário por ID.
- Exemplo: `http://localhost:3001/api/funcionario/excluir/123`

### GET /api/funcionarios/departamento/:departamento

- Descrição: Retorna todos os funcionários de um departamento específico.
- Exemplo: `http://localhost:3001/api/funcionarios/departamento/TI`

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (ou o seu banco de dados utilizado)
- Morgan
- Mongoose 

## Contribuindo

Se deseja contribuir para este projeto, abra uma issue ou envie um pull request.

## Autor

Bernardo Andrade

---
