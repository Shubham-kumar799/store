//components
import { Box, Button, VStack, Alert, AlertIcon, Flex } from '@chakra-ui/react';
import ImagePreview from './ImagePreview';

//utils
import { useRef, useState, FC, Dispatch, ChangeEvent } from 'react';

interface Props {
  files: any[];
  setFiles: Dispatch<any[]>;
  max?: number;
}

const ImageUpload: FC<Props> = ({ max = 4, files, setFiles }) => {
  const [alert, setAlert] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files.length > max - files.length) {
      setAlert(
        `Max Images limit exceeded. You can only upload a maximum of ${max} images`
      );
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      return;
    }
    setAlert('');
    setFiles([...files, ...Array.from(event.target.files)]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <VStack spacing={4}>
      <Box
        as={Button}
        textAlign={'center'}
        alignSelf={'center'}
        borderWidth={3}
        borderStyle="dashed"
        rounded={0}
        cursor={'pointer'}
        onClick={() => inputRef?.current?.click()}
        disabled={files.length >= max}
      >
        <input
          disabled={files.length >= max}
          ref={inputRef}
          hidden
          type="file"
          accept="image/png , image/jpeg"
          multiple={true}
          onChange={event => handleChange(event)}
        />
        {files.length >= max
          ? 'Max files selected'
          : `Click here to browse images (only jpeg and png accepted)`}
      </Box>

      <Flex p={2} m={2} wrap="wrap" justifyContent="space-evenly">
        {files?.map(f => {
          return (
            <ImagePreview
              key={`${Math.random()} ${f}`}
              file={f}
              files={files}
              setFiles={setFiles}
            />
          );
        })}
      </Flex>
      <Box justifyContent={'center'}>
        {alert && (
          <Alert status="error">
            <AlertIcon />
            {alert}
          </Alert>
        )}
      </Box>
    </VStack>
  );
};

export default ImageUpload;
