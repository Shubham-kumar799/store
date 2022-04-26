//components
import { AddProductSteps } from '@components/products';
import { AppDrawer } from '@components/global';
import { useToast } from '@chakra-ui/react';

//types
import { FC } from 'react';
import { FormikProps } from 'formik';
import {
  ProductInfoFormValuesType,
  SelectCategoryFormValuesType,
} from '@appTypes/products';

//utils
import { useSteps } from 'chakra-ui-steps';
import { useEffect, useRef, useState } from 'react';
import { useApi } from '@hooks';
import Resizer from 'react-image-file-resizer';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AddProductParent: FC<Props> = ({ isOpen, onClose, onOpen }) => {
  const toast = useToast();
  const { nextStep, prevStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });
  const [loading, setLoading] = useState(false);
  const [_, IMAGEAPI] = useApi({ method: 'Post', url: '/upload_images' });
  const [images, setImages] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({});
  // const [uploadedImages, setUploadedImages] = useState([]);
  const productInfoFormRef =
    useRef<FormikProps<ProductInfoFormValuesType>>(null);
  const selectCategoryFormRef =
    useRef<FormikProps<SelectCategoryFormValuesType>>(null);

  useEffect(() => {
    reset();
    setImages([]);
    setNewProduct({});
  }, [isOpen]);

  const resizeImage = (file: any): Promise<string> =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        'PNG',
        100,
        0,
        uri => {
          //@ts-ignore
          resolve(uri);
        },
        'base64'
      );
    });

  // const uploadImage = async (uri: any) => {
  //   try {
  //     const data = await IMAGEAPI({ body: { image: uri } });
  //     console.log('Images upload data', data);
  //     //@ts-ignore
  //     setUploadedImages([...uploadedImages, data.payload]);
  //   } catch (error) {
  //     toast({
  //       status: 'error',
  //       title: 'Error uploading images. Try Again',
  //       position: 'top-left',
  //     });
  //     console.log('error uploading image', error);
  //   }
  // };

  const uploadImage = async (uri: any) =>
    new Promise((resolve, reject) => {
      IMAGEAPI({ body: { image: uri } })
        .then(data => {
          //@ts-ignore
          resolve(data.payload);
        })
        .catch(error => {
          console.log('error uploaded image', error);
          reject(error);
        });
    });

  const handleCaseTwo = async () => {
    try {
      setLoading(true);
      let resizedImages: string[] = [];
      let uploadedImages: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const result = await resizeImage(images[i]);
        resizedImages.push(result);
      }
      for (let i = 0; i < resizedImages.length; i++) {
        const result = await uploadImage(resizedImages[i]);
        //@ts-ignore
        uploadedImages.push(result);
      }

      setNewProduct({
        ...newProduct,
        //@ts-ignore
        images: [...uploadedImages],
      });
      console.log('uploaded Images', uploadedImages);
      console.log('New Product', newProduct);
      nextStep();
      setLoading(false);
    } catch (error) {
      console.log('add Product  error', error);
    } finally {
      setLoading(false);
    }
  };

  const positiveButtonFunction = async () => {
    activeStep === 0
      ? productInfoFormRef.current?.submitForm()
      : activeStep === 1
      ? selectCategoryFormRef.current?.submitForm()
      : activeStep === 2
      ? await handleCaseTwo()
      : null;
  };

  return (
    <AppDrawer
      onClose={onClose}
      isOpen={isOpen}
      title="Create New Product"
      size="lg"
      noPadding={true}
      positiveButtonTitle={activeStep === 2 ? 'Add Product' : 'Next'}
      negativeButton={activeStep === 0 ? false : true}
      positiveButtonFunction={positiveButtonFunction}
      negativeButtonColorScheme={'gray'}
      negativeButtonTitle={'Previous'}
      negativeButtonFunction={prevStep}
      footer={activeStep === 3 ? false : true}
      positiveButtonLoading={loading}
      positiveButtonDisabled={images.length === 0 && activeStep === 2}
    >
      <AddProductSteps
        images={images}
        setImages={setImages}
        selectCategoryFormRef={selectCategoryFormRef}
        productInfoFormRef={productInfoFormRef}
        nextStep={nextStep}
        prevStep={prevStep}
        activeStep={activeStep}
        onClose={onClose}
        setNewProduct={setNewProduct}
        newProduct={newProduct}
      />
    </AppDrawer>
  );
};

export default AddProductParent;

// const uploadImages = () => {
//   return new Promise(resolve => {
//     images.forEach(async i => {
//       Resizer.imageFileResizer(
//         i,
//         720,
//         720,
//         'PNG',
//         100,
//         0,
//         async uri => {
//           try {
//             const data = await IMAGEAPI({ body: { image: uri } });
//             console.log('Images upload data', data);
//             //@ts-ignore
//             setUploadedImages([...uploadedImages, data.payload]);
//           } catch (error) {
//             toast({
//               status: 'error',
//               title: 'Error uploading images. Try Again',
//               position: 'top-left',
//             });
//             console.log('error uploading image', error);
//           }
//         },
//         'base64'
//       );
//     }, resolve(null));
//   });
// };
