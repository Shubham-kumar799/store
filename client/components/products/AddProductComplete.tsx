//components
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Heading, Center, Button } from '@chakra-ui/react';

//types
import { FC } from 'react';

interface Props {
  onClose: () => void;
}

const AddProductComplete: FC<Props> = ({ onClose }) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Product Added
      </Heading>
      <Text color={'gray.500'}>
        You can now view or update the product on your admin console
      </Text>
      <Button
        m={4}
        onClick={onClose}
        variant="outline"
        colorScheme="brand.tertiary"
      >
        Close
      </Button>
    </Box>
  );
};

export default AddProductComplete;
