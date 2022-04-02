//components
import { Text, useColorModeValue } from '@chakra-ui/react';

//types
import { FC } from 'react';

interface Props {
  text: string;
  onClick?: () => {};
}

const AppLink: FC<Props> = ({ text, onClick }) => {
  return (
    <Text
      onClick={onClick}
      color={useColorModeValue('brand.link.400', 'brand.link.400')}
      cursor={'pointer'}
      _hover={{
        textDecoration: 'underline',
      }}
    >
      {text}
    </Text>
  );
};

export default AppLink;
