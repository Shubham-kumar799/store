//components
import { AppSpinner, NoData } from '@components/global';
import { Center, Flex } from '@chakra-ui/react';

//types
import { FC } from 'react';

//utils
import { GET_COUPONS } from '@graphql/coupon';
import { useQuery } from '@apollo/client';
import SingleCoupon from './SingleCoupon';
import { Coupon } from '@appTypes/coupon';

const CouponBody: FC = () => {
  const { data, loading } = useQuery(GET_COUPONS);

  if (loading) {
    return (
      <Center>
        <AppSpinner />
      </Center>
    );
  }

  if (!data || !data.getCoupons) {
    return (
      <NoData
        heading="No coupons found"
        text="You can add coupons by clicking on the Add Coupon button"
      />
    );
  }

  return (
    <Flex wrap={'wrap'}>
      {data?.getCoupons?.map((coupon: Coupon) => (
        <SingleCoupon key={coupon._id} coupon={coupon} />
      ))}
    </Flex>
  );
};

export default CouponBody;
