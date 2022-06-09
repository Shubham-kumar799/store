import {
  Heading,
  Box,
  Center,
  Flex,
  Divider,
  useColorModeValue,
  Text,
  HStack,
} from '@chakra-ui/react';
import { CategoryBadge } from '@components/global';
import Image from 'next/image';

//icons
import { BiRupee } from 'react-icons/bi';

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
      maxW={'500px'}
      flex={1}
      m={'4'}
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'xl'}
      alignItems="center"
      textAlign={'center'}
    >
      <Box
        rounded={'xl'}
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <Image
          alt="product-image"
          objectFit={'cover'}
          height={400}
          width={400}
          src={product.images[0].url}
          style={{
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
          }}
        />

        <Heading
          alignSelf={'center'}
          w={'xs'}
          isTruncated={true}
          m={4}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {product.name}
        </Heading>

        <Flex
          h={'24'}
          justifyContent="center"
          overflow="hidden"
          flexWrap={'wrap'}
          alignItems={'center'}
        >
          <Box>
            {product.subCategories.map(s => (
              <CategoryBadge key={s._id} name={s.name} />
            ))}
          </Box>
        </Flex>

        <Divider />
        <HStack justifyContent={'center'}>
          <BiRupee />
          <Text fontSize="xl" fontWeight={'extrabold'}>
            {product.price}
          </Text>
        </HStack>
      </Box>
      <Center mt={2} mb={2}>
        <CardFooter productId={product._id} />
      </Center>
    </Box>
  );
};

export default ProductCard;
