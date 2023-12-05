
import SearchUser from '../components/SearchUser';
import { Box, Flex} from '@chakra-ui/react';
import Header from '../components/Header';


export default function MainPage() {
  return (
    <>
      <Header/>      
      <Box maxH={'80%'} mt={5}>
        <Flex gap={3} flexDir={'column'}>
          <SearchUser />
        </Flex>
      </Box>
    </>
  );
}

