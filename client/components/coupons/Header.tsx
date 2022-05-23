//components
import { HStack, Heading, Button } from '@chakra-ui/react';

//icons
import { AddIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

interface Props {
  onOpen: () => void;
}

const Header: FC<Props> = ({ onOpen }) => {
  return (
    <HStack m={4} alignItems={'center'} justifyContent="space-between">
      <Heading>Coupons</Heading>
      <Button
        rightIcon={<AddIcon />}
        colorScheme="brand.tertiary"
        variant="outline"
        onClick={onOpen}
      >
        New Coupon
      </Button>
    </HStack>
  );
};

export default Header;
