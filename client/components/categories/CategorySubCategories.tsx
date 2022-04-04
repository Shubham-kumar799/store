//components
import { MenuItem, useDisclosure } from '@chakra-ui/react';
import SubCategoryDrawer from './SubCategoryDrawer';

//icons
import { LinkIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

interface Props {
  name: string;
  id: string;
  colorScheme: string;
}

const CategorySubCategories: FC<Props> = ({ id, name, colorScheme }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <SubCategoryDrawer
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        parentId={id}
        colorScheme={colorScheme}
        parentName={name}
      />
      <MenuItem onClick={onOpen} icon={<LinkIcon />}>
        SubCategories
      </MenuItem>
    </>
  );
};

export default CategorySubCategories;
