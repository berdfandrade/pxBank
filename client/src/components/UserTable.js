
import {
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Tag,
  Text,
  Flex,
} from '@chakra-ui/react';

import formatarData from '../toolbox.js/formatarDataDeNascimento';
import { EditarFuncionario } from './EditarFuncionario';
import ExcluirFuncionario from './ExcluirFuncionario';

export default function UserTable({data}) {


  const SwitchBgHeader = useColorModeValue('gray.800', 'gray.300');
  const SwitchColor = useColorModeValue('gray.100', 'gray.800');

  const users = data;

  return (
    <Box w={'100%'} overflowX="auto">
      <Table borderRadius={'md'} variant="striped">
        <Thead bg={SwitchBgHeader} p={4}>
          <Tr>
            <Th color={SwitchColor}>Nome</Th>
            <Th color={SwitchColor}>Data de Nascimento</Th>
            <Th color={SwitchColor}>Salário</Th>
            <Th color={SwitchColor}>Departamento</Th>
            <Th color={SwitchColor}>Alterar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>
                <Text as={'b'}>{user.nome}</Text>
              </Td>
              <Td>{formatarData(user.dataNascimento)}</Td>
              <Td>R$ {user.salario}</Td>
              <Td>
                <Tag
                  colorScheme={
                    user.departamento === 'Financeiro'
                      ? 'purple'
                      : user.departamento === 'Vendas'
                      ? 'orange'
                      : user.departamento === 'TI'
                      ? 'green'
                      : user.departamento === 'RH'
                      ? 'yellow'
                      : 'blue'
                  }
                >
                  {user.departamento}
                </Tag>
              </Td>
              <Td>
                <Flex flexDir={'row'} gap={2}>

                  <EditarFuncionario user={user}/>
                  <ExcluirFuncionario user={user}/>

                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
