//components
import { AddProductSteps } from '@components/products';
import { AppDrawer, AppModal } from '@components/global';
import {
  Center,
  Heading,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

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
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from '@graphql/products';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AddProductParent: FC<Props> = ({ isOpen, onClose, onOpen }) => {
  const { nextStep, prevStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });
  const [callGetProducts] = useLazyQuery(GET_PRODUCTS);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const {
    isOpen: isModalOpen,
    onOpen: modalOpen,
    onClose: modalClose,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [_, IMAGEAPI] = useApi({ method: 'Post', url: '/upload_images' });
  const [__, PRODUCTAPI] = useApi({ method: 'Post', url: '/product' });
  const [images, setImages] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({});
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
      setFeedbackMsg('Preparing to upload...');
      setLoading(true);
      modalOpen();
      let resizedImages: string[] = [];
      let uploadedImages: string[] = [];
      setFeedbackMsg('Uploading images....');
      for (let i = 0; i < images.length; i++) {
        const result = await resizeImage(images[i]);
        resizedImages.push(result);
      }
      for (let i = 0; i < resizedImages.length; i++) {
        const result = await uploadImage(resizedImages[i]);
        //@ts-ignore
        uploadedImages.push(result);
      }

      setFeedbackMsg('Uploading product...');
      setNewProduct({
        ...newProduct,
      });
      await PRODUCTAPI({
        body: { product: { ...newProduct, images: [...uploadedImages] } },
      });
      await callGetProducts();
      modalClose();
      nextStep();
    } catch (error) {
      console.log('add Product  error', error);
    } finally {
      setLoading(false);
      modalClose();
      setFeedbackMsg('');
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
      <AppModal
        closable={false}
        footer={false}
        isOpen={isModalOpen}
        onClose={modalClose}
        title="Adding your product to the Gallery"
        header={false}
      >
        <Center m={4}>
          <Heading size="md">Adding your product to the gallery</Heading>
        </Center>
        <Progress size="xs" isIndeterminate />
        <Center m={4}>
          <Text>{feedbackMsg}</Text>
        </Center>
      </AppModal>
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
