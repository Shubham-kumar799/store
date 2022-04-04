//components
import {
  Button,
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { AppCloseButton } from '.';

//types
import { FC } from 'react';

//utils
import { useRef } from 'react';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  placement?: string;
  title: string;
  positiveButtonTitle: string;
  positiveButtonFunction: () => void;
  positiveButtonLoading: boolean;
}

const AppAddDrawer: FC<Props> = ({
  title,
  isOpen,
  onClose,
  onOpen,
  placement,
  children,
  positiveButtonTitle,
  positiveButtonFunction,
  positiveButtonLoading,
}) => {
  const firstField = useRef(null);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        closeOnOverlayClick={false}
        // @ts-ignore
        placement={placement ? placement : 'right'}
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderBottomWidth="1px"
          >
            {title}
            <AppCloseButton onClose={onClose} />
          </DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              colorScheme={'brand.error'}
              variant="ghost"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              isLoading={positiveButtonLoading}
              colorScheme={'brand.tertiary'}
              onClick={positiveButtonFunction}
            >
              {positiveButtonTitle}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppAddDrawer;
