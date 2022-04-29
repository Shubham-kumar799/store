import {
  Heading,
  Image,
  Box,
  Center,
  Stack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import CardButtons from './CardButtons';
import { CategoryBadge } from '@components/global';

//types
import { FC } from 'react';
import { Product } from '@appTypes/products';

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
      rounded={'xl'}
      p={0}
      alignItems="center"
      textAlign={'center'}
    >
      <Image
        alt="product-image"
        objectFit={'fill'}
        borderTopRadius={'xl'}
        h={250}
        width={320}
        maxH={250}
        src={product.images[0].url}
      />

      <Heading isTruncated={true} m={4} fontSize={'2xl'} fontFamily={'body'}>
        {product.name}
      </Heading>

      <CategoryBadge name={product.category.name} />

      <Stack
        scrollBehavior={'smooth'}
        overflow={'auto'}
        whiteSpace="nowrap"
        direction={'row'}
        mt={4}
        ml={2}
        mr={2}
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
          <CategoryBadge key={s._id} name={s.name} />
        ))}
      </Stack>

      <Divider mt={4} />
      <Center mt={2} mb={2}>
        <CardButtons product={product} />
      </Center>
    </Box>
  );
};

export default AdminProductCard;
