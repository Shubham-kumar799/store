import {
  Heading,
  Image,
  Box,
  Center,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { CategoryBadge } from '@components/global';

//types
import { FC } from 'react';
import { Product } from '@appTypes/products';
import CardFooter from './CardFooter';
import { useRouter } from 'next/router';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const router = useRouter();
  return (
    <Box
      boxShadow={'xl'}
      _hover={{
        boxShadow: 'dark-lg',
      }}
      transition="all .3s ease"
      cursor={'pointer'}
      m={6}
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'xl'}
      p={0}
      alignItems="center"
      textAlign={'center'}
    >
      <Box onClick={() => router.push(`/product/${product.slug}`)}>
        <Image
          alt="product-image"
          objectFit={'cover'}
          borderTopRadius={'xl'}
          h={250}
          width={320}
          maxH={250}
          src={product.images[0].url}
        />

        <Heading isTruncated={true} m={4} fontSize={'2xl'} fontFamily={'body'}>
          {product.name}
        </Heading>

        <Flex
          h={'24'}
          justifyContent="center"
          overflow="hidden"
          alignItems={'center'}
        >
          <Box>
            {product.subCategories.map(s => (
              <CategoryBadge key={s._id} name={s.name} />
            ))}
          </Box>
        </Flex>

        <Divider />
      </Box>
      <Center mt={2} mb={2}>
        <CardFooter productId={product._id} />
      </Center>
    </Box>
  );
};

export default ProductCard;
