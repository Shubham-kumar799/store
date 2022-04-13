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
  onClose: () => void;
  placement?: string;
  title: string;
  positiveButtonTitle?: string;
  positiveButtonFunction?: () => void;
  positiveButtonLoading?: boolean;
  size?: string;
  negativeButton?: boolean;
  negativeButtonColorScheme?: string;
  negativeButtonTitle?: string;
  footer?: boolean;
  noPadding?: boolean;
}

const AppDrawer: FC<Props> = ({
  title,
  isOpen,
  onClose,
  placement,
  children,
  positiveButtonTitle,
  positiveButtonFunction,
  positiveButtonLoading,
  size,
  negativeButton = true,
  negativeButtonColorScheme = 'brand.error',
  negativeButtonTitle = 'Cancel',
  footer = true,
  noPadding = false,
}) => {
  const firstField = useRef(null);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        closeOnOverlayClick={false}
        size={size ? size : 'xs'}
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

          <DrawerBody p={noPadding ? 0 : undefined}>{children}</DrawerBody>
          {footer && (
            <DrawerFooter borderTopWidth="1px">
              {negativeButton && (
                <Button
                  colorScheme={negativeButtonColorScheme}
                  variant="ghost"
                  mr={3}
                  onClick={onClose}
                >
                  {negativeButtonTitle}
                </Button>
              )}
              <Button
                isLoading={positiveButtonLoading}
                colorScheme={'brand.tertiary'}
                onClick={positiveButtonFunction}
              >
                {positiveButtonTitle}
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppDrawer;
