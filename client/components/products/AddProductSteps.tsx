//compoents
import { Step, Steps } from 'chakra-ui-steps';
import { Flex, Box } from '@chakra-ui/react';
import { ProductInfoForm } from './ProductInfoForm';
import { SelectCategoryForm } from './SelectCategoryForm';
import { UploadImageForm } from './UploadImageForm';
import AddProductComplete from './AddProductComplete';

//types
import { FC, RefObject, Dispatch } from 'react';
import { FormikProps } from 'formik';
import {
  ProductInfoFormValuesType,
  SelectCategoryFormValuesType,
} from '@appTypes/products';

//utils
import { useRef, SetStateAction } from 'react';

interface Props {
  onClose: () => void;
  activeStep: number;
  prevStep: () => void;
  nextStep: () => void;
  productInfoFormRef: RefObject<FormikProps<ProductInfoFormValuesType>>;
  selectCategoryFormRef: RefObject<FormikProps<SelectCategoryFormValuesType>>;
  images: string[];
  setImages: Dispatch<any[]>;
  setNewProduct: Dispatch<SetStateAction<{}>>;
  newProduct: any;
}

const AddProductSteps: FC<Props> = ({
  onClose,
  activeStep,
  prevStep,
  nextStep,
  productInfoFormRef,
  selectCategoryFormRef,
  images,
  setImages,
  setNewProduct,
  newProduct,
}) => {
  const steps = [
    {
      label: 'Add Info',
      content: (
        <ProductInfoForm
          newProduct={newProduct}
          nextStep={nextStep}
          formRef={productInfoFormRef}
          setNewProduct={setNewProduct}
        />
      ),
    },
    {
      label: 'Select Categories',
      content: (
        <SelectCategoryForm
          newProduct={newProduct}
          formRef={selectCategoryFormRef}
          nextStep={nextStep}
          setNewProduct={setNewProduct}
        />
      ),
    },
    {
      label: 'Upload images',
      content: <UploadImageForm images={images} setImages={setImages} />,
    },
  ];

  return (
    <Flex flexDir="column" width="100%" p={2}>
      <Steps labelOrientation="vertical" activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            <Box py={4} px={2}>
              {content}
            </Box>
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length && <AddProductComplete onClose={onClose} />}
    </Flex>
  );
};

export default AddProductSteps;
