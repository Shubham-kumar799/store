//components
import { MenuButton, Menu, MenuList, Button } from '@chakra-ui/react';
import CategoryUpdate from './CategoryUpdate';
import CategoryDelete from './CategoryDelete';
import CategorySubCategories from './CategorySubCategories';

//icons
import { ChevronDownIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

//utils
import { useState } from 'react';

interface Props {
  id: string;
  name: string;
  slug: string;
  colorScheme: string;
}

const Category: FC<Props> = ({ name, colorScheme, id, slug }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Menu>
      <MenuButton
        isLoading={isLoading}
        m={2}
        colorScheme={colorScheme}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="outline"
      >
        {name}
      </MenuButton>
      <MenuList>
        <CategoryUpdate name={name} id={id} slug={slug} />
        <CategoryDelete
          name={name}
          id={id}
          slug={slug}
          setIsLoading={setIsLoading}
        />
        <CategorySubCategories colorScheme={colorScheme} name={name} id={id} />
      </MenuList>
    </Menu>
  );
};

export default Category;
