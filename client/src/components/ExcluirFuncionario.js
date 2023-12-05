import {
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
  useDisclosure,
  Icon,
  Center,
  useToast
} from '@chakra-ui/react';

import { deletarFuncionario } from '../toolbox.js/URLs';
import axios from 'axios';
import { FaUserTimes } from 'react-icons/fa';
export default function ExcluirFuncionario({ user }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const deleteUser = () => {
    if (!user) return;
    console.log(user._id);
    axios
      .delete(`${deletarFuncionario}/${user._id}`)
      .then(response => {
        console.log('Usuário excluído com sucesso');

        toast({
          title: 'Funcionário excluído.',
          description: `Funcionário ${user.nome} excluído.`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        onClose();
      })
      .catch(error => {
        console.error('Erro ao excluir usuário:', error);
      });
  };

  return (
    <>
      <Button
        size={'xs'}
        onClick={onOpen}
        colorScheme="red"
        variant={'outline'}
      >
        Excluir
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja excluir o usuário abaixo?</ModalHeader>
          <Center>
            <Icon boxSize={'80px'} as={FaUserTimes} />
          </Center>
          <ModalCloseButton />
          <ModalBody ml={5} p={6}>
            <Flex flexDir={'column'}>
              <Text as={'b'} fontSize={'18'}>
                Nome : {user.nome}
              </Text>
              <Text as={'b'} fontSize={'18'}>
                CPF : {user.cpf}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={deleteUser} mr={3} colorScheme="red">
              Excluir
            </Button>
            <Button colorScheme="blue" variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
