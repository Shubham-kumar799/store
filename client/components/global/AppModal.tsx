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
  onClose: () => void;
  title: string;
  positiveButtonTitle?: string;
  positiveButtonFunction?: () => void;
  positiveButtonLoading?: boolean;
  initialRef?: any;
  footer?: boolean;
  closable?: boolean;
  header?: boolean;
}

const AppModal: FC<Props> = ({
  positiveButtonFunction,
  positiveButtonLoading,
  positiveButtonTitle,
  title,
  isOpen,
  onClose,
  children,
  footer = true,
  closable = true,
  header = true,
}) => {
  return (
    <Modal
      closeOnOverlayClick={closable}
      isCentered={true}
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={true}
    >
      <ModalOverlay />
      <ModalContent>
        {header && (
          <ModalHeader
            display={'flex'}
            flex={1}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {title}
            {closable && <AppCloseButton onClose={onClose} />}
          </ModalHeader>
        )}
        <ModalBody pb={6}>{children}</ModalBody>

        {footer && (
          <ModalFooter>
            <Button
              onClick={positiveButtonFunction}
              isLoading={positiveButtonLoading}
              colorScheme="brand.tertiary"
              mr={3}
            >
              {positiveButtonTitle}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
