//compoents
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Box } from '@chakra-ui/react';
import { ProductInfoForm } from './ProductInfoForm';
import { SelectCategoryForm } from './SelectCategoryForm';
import { UploadImageForm } from './UploadImageForm';
import AddProductComplete from './AddProductComplete';

//types
import { FC } from 'react';
import { FormikProps } from 'formik';
import { ProductInfoFormValuesType } from '@appTypes/products';

//utils
import { useRef } from 'react';

interface Props {
  onClose: () => void;
}

const AddProductSteps: FC<Props> = ({ onClose }) => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const productInfoFormRef =
    useRef<FormikProps<ProductInfoFormValuesType>>(null);

  const steps = [
    {
      label: 'Add Info',
      content: (
        <ProductInfoForm nextStep={nextStep} formRef={productInfoFormRef} />
      ),
    },
    {
      label: 'Select Categories',
      content: <SelectCategoryForm nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      label: 'Upload images',
      content: <UploadImageForm prevStep={prevStep} nextStep={nextStep} />,
    },
  ];

  return (
    <Flex flexDir="column" width="100%" p={2}>
      <Steps labelOrientation="vertical" activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            <Box py={8} px={2}>
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
