//components
import { Box, HStack, Button } from '@chakra-ui/react';
import { ImageUpload } from '@components/global';

//types
import { FC } from 'react';

//utils
import { useState, useEffect } from 'react';

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const UploadImageForm: FC<Props> = ({ prevStep, nextStep }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {}, [images]);

  return (
    <Box>
      <ImageUpload
        error={error}
        images={images}
        setImages={setImages}
        max={4}
      />
      <HStack w="full" justifyContent={'flex-end'}>
        <Button onClick={prevStep} variant={'ghost'}>
          Previous
        </Button>
        <Button
          onClick={nextStep}
          colorScheme={'brand.tertiary'}
          alignSelf={'flex-end'}
        >
          Add Product
        </Button>
      </HStack>
    </Box>
  );
};

export default UploadImageForm;
