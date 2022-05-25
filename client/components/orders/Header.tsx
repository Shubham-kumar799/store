//components
import { HStack, Heading } from '@chakra-ui/react';

//types
import { FC } from 'react';

const Header: FC = () => {
  return (
    <HStack m={4} alignItems={'center'} justifyContent="space-between">
      <Heading>Orders</Heading>
    </HStack>
  );
};

export default Header;
