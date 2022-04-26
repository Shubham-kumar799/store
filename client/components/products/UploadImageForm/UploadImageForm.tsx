//components
import { Box } from '@chakra-ui/react';
import { ImageUpload } from '@components/global';

//types
import { FC, Dispatch } from 'react';

interface Props {
  images: string[];
  setImages: Dispatch<any[]>;
}

const UploadImageForm: FC<Props> = ({ images, setImages }) => {
  return (
    <Box>
      <ImageUpload files={images} setFiles={setImages} />
    </Box>
  );
};

export default UploadImageForm;
