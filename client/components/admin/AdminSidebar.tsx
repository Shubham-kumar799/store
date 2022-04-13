//components
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Text,
} from '@chakra-ui/react';

//icons
import { FiSettings, FiMenu } from 'react-icons/fi';
import { TiTicket } from 'react-icons/ti';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { SiSmartthings } from 'react-icons/si';

//types
import { FC } from 'react';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

//utils
import { useRouter } from 'next/router';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'CONSOLE', icon: MdAdminPanelSettings, href: '/admin/console' },
  { name: 'PRODUCTS', icon: SiSmartthings, href: '/admin/products' },
  { name: 'CATEGORIES', icon: BiCategoryAlt, href: '/admin/categories' },
  { name: 'COUPONS', icon: TiTicket, href: '/admin/coupons' },
  { name: 'SETTINGS', icon: FiSettings, href: '/admin/settings' },
];

const AdminSidebar: FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  if (!router.pathname.includes('/admin')) return <>{children}</>;
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Flex
      onClick={() => router.push(href)}
      align="center"
      p="2"
      m="2"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      bgColor={router.pathname.includes(href) ? 'brand.primary.500' : undefined}
      _hover={{
        bg: 'brand.primary.500',
        color: 'white',
      }}
      {...rest}
    >
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: 'white',
        }}
        as={icon}
        color={router.pathname.includes(href) ? 'white' : undefined}
      />
      <Text
        color={router.pathname.includes(href) ? 'white' : undefined}
        fontWeight={'bold'}
      >
        {children}
      </Text>
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};

export default AdminSidebar;
