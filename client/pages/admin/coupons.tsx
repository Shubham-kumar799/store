//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { CouponBody, Header } from '@components/coupons';
import { AddCouponForm } from '@components/coupons';
import { AppDrawer } from '@components/global';

//types
import { NextPage } from 'next';
import { AddCouponFormValuesType } from '@appTypes/coupon';
import { FormikProps } from 'formik';

//utils
import { useRef, useState } from 'react';

const Coupons: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<FormikProps<AddCouponFormValuesType>>(null);
  const [positiveButtonLoading, setPositiveButtonLoading] = useState(false);

  return (
    <Flex direction={'column'} flex={1} justifyContent="center">
      <AppDrawer
        positiveButtonLoading={positiveButtonLoading}
        positiveButtonTitle="Add Coupon"
        positiveButtonFunction={() => formRef.current?.submitForm()}
        title={'Create new coupon'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AddCouponForm
          setPositiveButtonLoading={setPositiveButtonLoading}
          formRef={formRef}
        />
      </AppDrawer>
      <Header onOpen={onOpen} />
      <Divider />
      <CouponBody />
    </Flex>
  );
};

export default Coupons;
