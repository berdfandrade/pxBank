import {
  Box,
  Flex,
  Spacer,
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputLeftAddon,
  InputGroup,
  Stack,
  Radio,
  RadioGroup,
  Icon,
  Center,
  useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa";

import formatCPF from '../toolbox.js/formataCPF';
import { criarFuncionario } from '../toolbox.js/URLs';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export default function Header() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SwitchBgHeader = useColorModeValue('gray.800', 'gray.300');
  const SwitchColor = useColorModeValue('gray.100', 'gray.800');

  const handleChangeCPF = e => {
    const { name, value } = e.target;
    if (name === 'cpf' && value.length > 14) {
      return;
    }
    setFormData(prevData => ({ ...prevData, [name]: formatCPF(value) }));
  };

  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    salario: '',
    departamento: '',
    cpf: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const formattedData = {
      "nome": formData.nome,
      "dataNascimento": formData.dataNascimento,
      "salario": parseFloat(formData.salario),
      "departamento": formData.departamento,
      "cpf": formData.cpf,
    };

    console.log(formattedData);

   
    axios
      .post(criarFuncionario, formattedData)
      .then(() => {
        console.log(`Funcionário ${formattedData.nome} cadastrado!`);
        toast({
          title: 'Funcionário cadastrado!',
          description: `Funcionário ${formattedData.nome} cadastrado! .`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        onClose();
      })
      .catch(error => {
        console.error('Erro ao criar funcionário:', error);
        onClose();
      });
  };

  return (
    <>
      <Box p={4} bg={SwitchBgHeader}>
        <Flex flexDir={'row'}>
          <Text mt={2} fontSize={'lg'} color={SwitchColor} as={'b'}>
            Sistema de teste{' '}
          </Text>
          <Spacer />
          <ColorModeSwitcher />
          <Button onClick={onOpen} mr={'5px'} bg={SwitchColor} ml={'5px'}>
            {' '}
            <Text color={SwitchBgHeader}>Novo funcionário</Text>
          </Button>
        </Flex>
      </Box>

      {/* Modal para criação do novo funcionário */}


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo funcionário</ModalHeader>
          <Center>
            <Icon boxSize={"80px"} as={FaUserPlus}/>
          </Center>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Flex flexDir={'column'}>
              <Text fontSize={'sm'} mb={1}>
                Nome:
              </Text>
              <Input
                isRequired
                placeholder='John Doe'
                mb={2}
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <Text fontSize={'sm'} mb={1}>
                CPF:
              </Text>
              <Input
                isRequired
                placeholder='000.000.000-00'  
                mb={2}
                name="cpf"
                value={formData.cpf}
                onChange={handleChangeCPF}
              />
              <Text fontSize={'sm'} mb={1}>
                Departamento:
              </Text>
              <RadioGroup
                isRequired
                name="departamento"
                // defaultValue="RH"
                onChange={value =>
                  setFormData({ ...formData, departamento: value })
                }
                mb={3}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="RH">
                    RH
                  </Radio>
                  <Radio colorScheme="green" value="Vendas">
                    Vendas
                  </Radio>
                  <Radio colorScheme="green" value="TI">
                    TI
                  </Radio>
                  <Radio colorScheme="green" value="Marketing">
                    Marketing
                  </Radio>
                </Stack>
              </RadioGroup>

              <Text mb={2} fontSize={'sm'}>
                Salário:
              </Text>
              <InputGroup>
                <InputLeftAddon>
                  <Text>R$</Text>
                </InputLeftAddon>
                <Input
                  isRequired
                  mb={2}
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                />
              </InputGroup>

              <Text mb={2} fontSize={'sm'}>
                Data de nascimento:
              </Text>
              <Input
                isRequired
                mb={2}
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={2} onClick={handleSubmit}>
              Salvar
            </Button>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
