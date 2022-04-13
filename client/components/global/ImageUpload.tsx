//components
import {
  Box,
  Text,
  Wrap,
  WrapItem,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import ImagePreview from './ImagePreview';

//types
import { Dispatch, FC, useEffect } from 'react';

//utils
import { useRef, useState } from 'react';

interface Props {
  images: any[];
  setImages: Dispatch<any>;
  error: boolean;
  max: number;
}

const ImageUpload: FC<Props> = ({ max, images, setImages, error }) => {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setPreviews(
      //@ts-ignore
      images.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [images]);

  const handleChange = (event: any) => {
    setImages(Array.from(event.target.files));
  };

  return (
    <>
      <FormControl isInvalid={error}>
        <Box
          cursor={'pointer'}
          //@ts-ignore
          onClick={() => inputRef.current.click()}
          textAlign={'center'}
          p={4}
          borderStyle="dashed"
          borderWidth={2}
          borderColor={error ? 'brand.error.200' : undefined}
          mt={2}
        >
          <input
            ref={inputRef}
            disabled={images.length > 3}
            type="file"
            multiple={true}
            hidden
            max={max}
            accept="image/png,  image/jpeg"
            //@ts-ignore
            onChange={event => handleChange(event)}
          />
          {images.length >= max ? (
            <>
              <Text>{`Maximum ${max} images selected`}</Text>
              <Text>Cannot select any more images</Text>
            </>
          ) : (
            <>
              <Text>{`Click to upload Images (maximum ${max})`}</Text>
              <Text>Only .jpeg and .png images are accepted</Text>
            </>
          )}
        </Box>
        <FormErrorMessage>Image is required</FormErrorMessage>
      </FormControl>

      <Wrap justify={'space-evenly'} mt={4}>
        {previews?.map((file: any) => {
          return (
            <WrapItem key={file.name}>
              <ImagePreview
                name={file?.name}
                preview={file?.preview}
                key={file?.name}
                setImages={setImages}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default ImageUpload;
