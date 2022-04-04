//components
import {
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

//icons
import { ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <MenuItem icon={<EditIcon />} onClick={onOpen}>
          Update
        </MenuItem>
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
