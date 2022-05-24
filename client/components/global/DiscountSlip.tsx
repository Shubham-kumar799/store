//components
import { VStack, HStack, Text, Badge } from '@chakra-ui/react';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';

//utils
import { useAppSelector, selectCouponInfo } from '@store';

const DiscountSlip: FC = () => {
  const couponInfo = useAppSelector(selectCouponInfo);

  return (
    <VStack alignItems={'flex-start'} w="full">
      <HStack justifyContent={'space-between'} w="full">
        <HStack>
          <Text fontSize="lg" fontWeight={'bold'}>
            Grand Total :
          </Text>
          <BiRupee />
          <Text as="s" fontSize="xl">
            {couponInfo.originalPrice}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="lg" fontWeight={'bold'}>
            Coupon Applied :
          </Text>
          <Badge variant={'solid'} colorScheme={'brand.tertiary'}>
            {couponInfo.couponName}
          </Badge>
        </HStack>
      </HStack>
      <HStack>
        <Text fontSize="lg" fontWeight={'bold'}>
          New Total :
        </Text>
        <BiRupee />
        <Text fontSize="xl" fontWeight={'extrabold'}>
          {couponInfo.discountedPrice}
        </Text>
      </HStack>
    </VStack>
  );
};

export default DiscountSlip;
