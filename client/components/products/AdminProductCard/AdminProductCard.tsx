import {
  Heading,
  Image,
  Box,
  Center,
  Stack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

//types
import { FC } from 'react';
import { Product } from '@appTypes/products';
import CardButtons from './CardButtons';
import CategoryBadge from './CategoryBadge';

interface Props {
  product: Product;
}

const AdminProductCard: FC<Props> = ({ product }) => {
  return (
    <Box
      transition="all .3s ease"
      cursor={'pointer'}
      m={10}
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'xl'}
      _hover={{
        boxShadow: 'dark-lg',
      }}
      rounded={'lg'}
      p={6}
      pb={0}
    >
      <Center>
        <Image
          alt="product-image"
          objectFit={'contain'}
          h={200}
          maxW={200}
          maxH={250}
          src={product.images[0].url}
        />
      </Center>
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {product.name}
      </Heading>

      <Center mt={6}>
        <CategoryBadge name={product.category.name} />
      </Center>
      <Stack
        scrollBehavior={'smooth'}
        overflow={'auto'}
        whiteSpace="nowrap"
        direction={'row'}
        mt={6}
        pl={2}
        pr={2}
        css={{
          '.container': {
            '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
            'scrollbar-width': 'none' /* Firefox */,
          },
          '&::-webkit-scrollbar': {
            display: 'none' /* Safari and Chrome */,
          },
        }}
      >
        {product.subCategories.map(s => (
          <CategoryBadge name={s.name} />
        ))}
      </Stack>

      <Divider mt={4} />
      <Center mt={2} mb={2}>
        <CardButtons />
      </Center>
    </Box>
  );
};

export default AdminProductCard;
