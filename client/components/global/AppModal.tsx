//components
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
} from '@chakra-ui/react';
import { AppCloseButton } from '@components/global';

//types
import { FC } from 'react';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  positiveButtonTitle: string;
  positiveButtonFunction: () => void;
  positiveButtonLoading: boolean;
  initialRef?: any;
}

const AppModal: FC<Props> = ({
  positiveButtonFunction,
  positiveButtonLoading,
  positiveButtonTitle,
  title,
  isOpen,
  onOpen,
  onClose,
  children,
  initialRef,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      isCentered={true}
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={'flex'}
          flex={1}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          {title}
          <AppCloseButton onClose={onClose} />
        </ModalHeader>
        <ModalBody pb={6}>{children}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => positiveButtonFunction()}
            isLoading={positiveButtonLoading}
            colorScheme="brand.tertiary"
            mr={3}
          >
            {positiveButtonTitle}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
