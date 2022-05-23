//components
import { Box, Heading, Text } from '@chakra-ui/react';

//types
import { FC } from 'react';
import Image from 'next/image';

interface Props {
  heading?: string;
  text?: string;
}

const NoData: FC<Props> = ({ heading, text }) => {
  return (
    <Box
      display="flex"
      flexDir={'column'}
      alignItems={'center'}
      textAlign={'center'}
      p={4}
    >
      {heading && (
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {heading}
        </Heading>
      )}
      <Image
        src="/images/upload.png"
        width={250}
        height={250}
        objectFit="contain"
      />
      {text && <Text color={'gray.500'}>{text}</Text>}
    </Box>
  );
};

export default NoData;
