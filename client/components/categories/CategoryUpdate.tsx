//components
import { MenuItem, useDisclosure } from '@chakra-ui/react';
import UpdateCategoryModal from './UpdateCategoryModal';

//icons
import { EditIcon } from '@chakra-ui/icons';

//types
import { FC } from 'react';

interface Props {
  id: string;
  name: string;
  slug: string;
}

const CategoryUpdate: FC<Props> = ({ name, id, slug }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <UpdateCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        name={name}
        id={id}
        slug={slug}
      />
      <MenuItem onClick={onOpen} icon={<EditIcon />}>
        Update
      </MenuItem>
    </>
  );
};

export default CategoryUpdate;
