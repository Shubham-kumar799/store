//components
import { NoData } from '@components/global';

//types
import { FC } from 'react';

const CouponBody: FC = () => {
  return (
    <>
      <NoData
        heading="No coupons found"
        text="You can add coupons by clicking on the Add Coupon button"
      />
    </>
  );
};

export default CouponBody;
