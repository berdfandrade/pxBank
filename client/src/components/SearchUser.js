import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Spacer,
  Select,
  useColorModeValue,
  Spinner,
  Center,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { getFuncionarios } from '../toolbox.js/URLs';
import { encontrarFuncionarioPorNome } from '../toolbox.js/URLs';
import { encontrarPorDepartamento } from '../toolbox.js/URLs';
import UserTable from './UserTable';

export default function SearchUser() {
  const [searchFail, setSearchfail] = useState(false);
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    let url = getFuncionarios;

    if (
      departamentoSelecionado &&
      departamentoSelecionado !== 'Todos departamentos'
    ) {
      url = `${encontrarPorDepartamento}/${encodeURIComponent(
        departamentoSelecionado
      )}`;
    }

    if (nome) {
      console.log(url);
      url = `${encontrarFuncionarioPorNome}/${encodeURIComponent(nome)}`;
      console.log(url);
    }

    axios
      .get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setSearchfail(true);
        console.error('Erro ao buscar funcionários:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(getFuncionarios)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setSearchfail(true);
        console.error('Erro ao buscar funcionários:', error);
      });
  }, []);

  const departamentos = ['Vendas', 'TI', 'Marketing', 'RH'];

  const SwitchColor = useColorModeValue('gray.800', 'gray.100');
  const SwitchColorText = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Box h={'150px'} p={6}>
        <Flex alignItems={'center'} gap={30} flexDir={'row'}>
          <Flex gap={1} flexDir={'column'}>
            <Text fontSize={'sm'}>Nome: </Text>
            <Input onChange={e => setNome(e.target.value)} />
          </Flex>

          <Flex gap={1} flexDir={'column'}>
            <Text fontSize={'sm'}>Departamento: </Text>
            <Select
              w={'200px'}
              onChange={e => setDepartamentoSelecionado(e.target.value)}
            >
              <option value="Todos departamentos">Todos departamentos</option>
              {departamentos.map((departamento, index) => (
                <option key={index} value={departamento}>
                  {departamento}
                </option>
              ))}
            </Select>
          </Flex>
          <Spacer />
          <Button
            variant={'outline'}
            mt={3}
            size={'md'}
            bg={SwitchColor}
            onClick={handleSearch}
          >
            <Text color={SwitchColorText}>Pesquisar</Text>
          </Button>
        </Flex>
      </Box>
      {isLoading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : searchFail ? ( // Correção na estrutura das condicionais
        <Text mt={4} textAlign="center">
          Falha ao buscar funcionários
        </Text>
      ) : (
        <UserTable data={data} />
      )}
    </>
  );
}
