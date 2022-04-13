import { Box, useColorModeValue, Image, IconButton } from '@chakra-ui/react';

//icons
import { DeleteIcon } from '@chakra-ui/icons';

//types
import { Dispatch, FC } from 'react';

interface Props {
  preview: string;
  name: string;
  setImages: Dispatch<any>;
}

const ImagePreview: FC<Props> = ({ name, preview, setImages }) => {
  return (
    <Box position="relative" maxW={'330px'} w="max-content" overflow={'hidden'}>
      <Image
        bg={useColorModeValue('white', 'gray.800')}
        h={180}
        w={180}
        src={preview}
        objectFit="contain"
      />
      <IconButton
        position="absolute"
        top={0}
        right={0}
        rounded={0}
        variant={'ghost'}
        colorScheme={'brand.error'}
        aria-label="delete"
        onClick={() =>
          setImages((prevState: any) =>
            prevState.filter((p: any) => p.name != name)
          )
        }
        icon={<DeleteIcon color={'brand.error.500'} />}
      />
    </Box>
  );
};

export default ImagePreview;
