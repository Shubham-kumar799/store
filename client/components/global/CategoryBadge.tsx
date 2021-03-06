//components
import { Badge, useColorModeValue } from '@chakra-ui/react';

//types
import { FC } from 'react';

interface Props {
  name: string;
}

const CategoryBadge: FC<Props> = ({ name }) => {
  return (
    <Badge
      alignSelf="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
      fontWeight={'400'}
    >
      {name}
    </Badge>
  );
};

export default CategoryBadge;
