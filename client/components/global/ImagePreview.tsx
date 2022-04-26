//components
import { Flex, IconButton, Image } from '@chakra-ui/react';

//icons
import { DeleteIcon } from '@chakra-ui/icons';

//utils
import { FC, Dispatch } from 'react';

interface Props {
  file: any;
  files: any[];
  setFiles: Dispatch<any[]>;
}

const ImagePreview: FC<Props> = ({ file, setFiles, files }) => {
  return (
    <Flex
      alignItems={'center'}
      borderWidth={2}
      flexDirection={'column'}
      position="relative"
      m={4}
    >
      <IconButton
        aria-label="delete"
        top={'-15%'}
        position={'absolute'}
        variant={'solid'}
        colorScheme="red"
        rounded={'full'}
        icon={<DeleteIcon />}
        onClick={() => setFiles(files.filter(f => f.name != file.name))}
      />
      <Image
        w={150}
        h={150}
        objectFit="contain"
        src={URL.createObjectURL(file)}
      />
    </Flex>
  );
};

export default ImagePreview;
