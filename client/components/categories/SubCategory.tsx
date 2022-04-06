//components
import { MenuButton, Menu, MenuList, Button } from '@chakra-ui/react';

//icons
import { ChevronDownIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';
import SubCategoryDelete from './SubCategoryDelete';

//utils
import { useState } from 'react';

interface Props {
  name: string;
  colorScheme: string;
  parentId: string;
  slug: string;
  id: string;
}

const SubCategory: FC<Props> = ({ parentId, name, colorScheme, slug, id }) => {
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
        <SubCategoryDelete
          id={id}
          parentId={parentId}
          name={name}
          slug={slug}
          setIsLoading={setIsLoading}
        />
      </MenuList>
    </Menu>
  );
};

export default SubCategory;
