//components
import { Button, Center, Text } from '@chakra-ui/react';

//icons
import { FaFacebook } from 'react-icons/fa';

//types
import { FC } from 'react';

interface Props {
  title: string;
}

const FacebookButton: FC<Props> = ({ title }) => {
  return (
    <Button w={'full'} colorScheme={'facebook'} leftIcon={<FaFacebook />}>
      <Center>
        <Text>{title}</Text>
      </Center>
    </Button>
  );
};

export default FacebookButton;
