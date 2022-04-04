//components
import { Box, Heading, Text } from '@chakra-ui/react';

//icons
import { InfoIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

interface Props {
  heading?: string;
  text?: string;
}

const NoData: FC<Props> = ({ heading, text }) => {
  return (
    <Box textAlign={'center'}>
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      {heading && (
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {heading}
        </Heading>
      )}

      {text && <Text color={'gray.500'}>{text}</Text>}
    </Box>
  );
};

export default NoData;
