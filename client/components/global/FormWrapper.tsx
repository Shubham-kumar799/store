import { FC } from 'react';

//components
import { Box, useColorModeValue } from '@chakra-ui/react';

const EmailFrom: FC = ({ children }) => {
  return (
    <Box
      bg={useColorModeValue('brand.background.50', 'brand.background.700')}
      p={6}
      rounded="md"
      w={['80%', '60%', '35%']}
    >
      {children}
    </Box>
  );
};

export default EmailFrom;
