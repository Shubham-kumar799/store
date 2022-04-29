//components
import {
  Box,
  Center,
  Text,
  Icon,
  HStack,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { CategoryBadge } from '@components/global';

//icons
import { BiRupee } from 'react-icons/bi';

//types
import { FC } from 'react';
import { SubCategory } from '@appTypes/subCategories';
import { CardFooter } from '@components/home/ProductCard';

interface Props {
  price: number;
  subCategories: SubCategory[];
}

const ProductInfoLeft: FC<Props> = ({ price, subCategories }) => {
  return (
    <VStack mt={10} p={4} spacing={'10'} alignItems="flex-start" flex={1}>
      <HStack>
        <Icon as={BiRupee} />
        <Text fontWeight="bold" fontSize="2xl" as={'i'}>
          {price}
        </Text>
        <Text>(Inc. of all taxes)</Text>
      </HStack>

      <Text>RATING</Text>
      <Wrap>
        {subCategories.map(s => (
          <CategoryBadge name={s.name} />
        ))}
      </Wrap>

      <CardFooter />
    </VStack>
  );
};

export default ProductInfoLeft;
