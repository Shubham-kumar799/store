//components
import { Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { CouponBody, Header } from '@components/coupons';
import { AddCouponForm } from '@components/coupons';
import { AppDrawer } from '@components/global';

//types
import { NextPage } from 'next';

const Coupons: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction={'column'} flex={1} justifyContent="center">
      <AppDrawer
        // positiveButtonLoading={positiveButtonLoading}
        positiveButtonTitle="Add Coupon"
        // positiveButtonFunction={() => formRef.current?.submitForm()}
        title={'Create new coupon'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AddCouponForm />
      </AppDrawer>
      <Header onOpen={onOpen} />
      <Divider />
      <CouponBody />
    </Flex>
  );
};

export default Coupons;
