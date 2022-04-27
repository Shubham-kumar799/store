//compopnents
import { IconButton, Tooltip } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';

//icon
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

//types
import { FC } from 'react';

const CardButtons: FC = () => {
  return (
    <HStack m={2} flex={1} justifyContent={'space-around'}>
      <Tooltip label="Edit or update product">
        <IconButton
          variant={'outline'}
          colorScheme={'brand.primary'}
          aria-label="Cart"
          icon={<BiEdit />}
        />
      </Tooltip>
      <Tooltip label="Delete product">
        <IconButton
          variant={'ghost'}
          colorScheme={'brand.error'}
          aria-label="Cart"
          icon={<MdDelete />}
        />
      </Tooltip>
    </HStack>
  );
};

export default CardButtons;
