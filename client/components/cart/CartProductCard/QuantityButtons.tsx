//components
import { HStack, Text, IconButton, Flex } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

interface Props {
  count: number;
}

const QuantityButtons: FC<Props> = ({ count }) => {
  return (
    <Flex justifyContent="center">
      <HStack justifyContent={'space-between'} w="40">
        <IconButton
          colorScheme={'brand.secondary'}
          variant="outline"
          aria-label="decrement"
          icon={<MinusIcon />}
        />
        <Text>{count}</Text>
        <IconButton
          colorScheme={'brand.tertiary'}
          variant="outline"
          aria-label="increment"
          icon={<AddIcon />}
        />
      </HStack>
    </Flex>
  );
};

export default QuantityButtons;
