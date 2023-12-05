import {
  Radio,
  RadioGroup,
  Input,
  InputLeftAddon,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
  Stack,
  useDisclosure,
  Icon,
  Center,
  useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import formatCPF from '../toolbox.js/formataCPF';
import axios from 'axios'
import { atualizarFuncionario } from '../toolbox.js/URLs';
import { FaUserEdit } from "react-icons/fa";

export function EditarFuncionario({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

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
      _id : user._id,
      nome: formData.nome,
      dataNascimento: formData.dataNascimento,
      salario: parseFloat(formData.salario),
      departamento: formData.departamento,
      cpf: formData.cpf,
    };

    console.log(formattedData);

    axios
      .post(atualizarFuncionario, formattedData)
      .then(() => {
        console.log(`Funcionário atualizado!`);
        toast({
          title: 'Funcionário atualizado.',
          description: `Funcionário atualizado.`,
          status: 'info',
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
      <Button size={'xs'} colorScheme="blue" onClick={onOpen}>
        Editar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar informações do funcionário</ModalHeader>
          <Center>
          <Icon boxSize={"80px"}as={FaUserEdit}/>
          </Center> 
          <ModalCloseButton />
          <ModalBody ml={5} p={3}>
            <Flex gap={2} flexDir={'column'}>
              <Text as={'b'}>Nome :</Text>
              <Input
                name="nome"
                value={formData.nome}
                placeholder={user.nome}
                onChange={handleChange}
              ></Input>
              <Text as={'b'}>CPF :</Text>
              <Input
                name="cpf"
                onChange={handleChangeCPF}
                value={formData.cpf}
                placeholder={user.cpf}
              />
              <Text as={'b'}>Departamento :</Text>

              <RadioGroup
                name="departamento"
                onChange={value =>
                  setFormData({ ...formData, departamento: value })
                }
                defaultValue={user.departamento}
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
              <Text as={'b'}>Salário :</Text>
              <InputGroup>
                <InputLeftAddon>
                  <Text>R$</Text>
                </InputLeftAddon>
                <Input
                  mb={2}
                  onChange={handleChange}
                  defaultValue={user.salario}
                  name="salario"
                />
              </InputGroup>

              <Text as={'b'}>Data de Nascimento :</Text>
              <Input
                type="date"
                onChange={handleChange}
                defaultValue={user.dataNascimento}
                value={formData.dataNascimento}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit} mr={3}>
              Salvar
            </Button>
            <Button colorScheme="red" variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
