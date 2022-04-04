//components
import { IconButton } from '@chakra-ui/react';

//icons
import { CloseIcon } from '@chakra-ui/icons';

//utils
import { FC } from 'react';

interface Props {
  onClose: () => void;
}

const AppCloseButton: FC<Props> = ({ onClose }) => {
  return (
    <IconButton
      aria-label="close"
      icon={<CloseIcon />}
      onClick={onClose}
      variant="ghost"
      colorScheme={'brand.error'}
    />
  );
};

export default AppCloseButton;
