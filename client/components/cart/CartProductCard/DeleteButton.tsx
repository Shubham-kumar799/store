//components
import { IconButton } from '@chakra-ui/react';

//icons
import { DeleteIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

const DeleteButton: FC = () => {
  return (
    <IconButton
      top={5}
      right={5}
      aria-label="delete"
      position="absolute"
      icon={<DeleteIcon />}
      colorScheme="brand.secondary"
      variant="ghost"
    />
  );
};

export default DeleteButton;
