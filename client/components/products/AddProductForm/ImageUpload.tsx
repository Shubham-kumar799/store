//components
import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import ImagePreview from './ImagePreview';

//types
import { FC, useEffect } from 'react';

//utils
import { useRef, useState } from 'react';

const ImageUpload: FC = () => {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setPreviews(
      //@ts-ignore
      files.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [files]);

  return (
    <>
      <Box
        cursor={'pointer'}
        //@ts-ignore
        onClick={() => inputRef.current.click()}
        textAlign={'center'}
        p={4}
        borderStyle="dashed"
        borderWidth={2}
        mt={2}
      >
        <input
          ref={inputRef}
          disabled={files.length > 3}
          type="file"
          multiple={true}
          hidden
          max={4}
          accept="image/png,  image/jpeg"
          //@ts-ignore
          onChange={event => setFiles(Array.from(event.target.files))}
        />
        {files.length > 3 ? (
          <>
            <Text>Maximum 4 files selected</Text>
            <Text>Cannot select any more files</Text>
          </>
        ) : (
          <>
            <Text>Click to upload Images (maximum 4)</Text>
            <Text>Only .jpeg and .png images are accepted</Text>
          </>
        )}
      </Box>
      <Wrap justify={'space-evenly'} mt={4}>
        {previews?.map((file: any) => {
          return (
            <WrapItem key={file.name}>
              <ImagePreview
                name={file?.name}
                preview={file?.preview}
                key={file?.name}
                setFiles={setFiles}
                files={files}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default ImageUpload;
