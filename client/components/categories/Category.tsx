//components
import {
  MenuButton,
  useToast,
  Menu,
  MenuItem,
  MenuList,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AppModal } from '@components/global';
import UpdateCategoryForm from './UpdateCategoryForm';

//icons
import { ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

//types
import { FC, useRef } from 'react';
import { FormikProps } from 'formik';

//utils
import { useState } from 'react';
import { useApi } from '@hooks';
import { useApolloClient } from '@apollo/client';
import { UpdateCategoryFormValuesType } from '@appTypes/categories';

interface Props {
  id: string;
  name: string;
  slug: string;
  colorScheme: string;
}

const Category: FC<Props> = ({ id, name, slug, colorScheme }) => {
  const toast = useToast();
  const initialFieldRefForFocus = useRef(null);
  const formRef = useRef<FormikProps<UpdateCategoryFormValuesType>>(null);
  const { cache } = useApolloClient();
  const [_, deleteAPI] = useApi({ url: `/category/${slug}`, method: 'post' });
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteCategory = async () => {
    try {
      setIsLoading(true);
      const data = await deleteAPI({});
      cache.evict({
        id: cache.identify({
          __typename: 'Category',
          slug,
          name,
          _id: id,
        }),
      });
      // @ts-ignore
      if (data.success) {
        toast({
          status: 'success',
          title: `Deleted category ${name}`,
          position: 'top',
        });
      }
    } catch (error) {
      console.log('Error deleting category', error);
      toast({
        status: 'error',
        title: `Error deleting ${name} . Try Again`,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu>
      <AppModal
        title={`Update Category ${name}`}
        positiveButtonFunction={() => formRef.current?.submitForm()}
        positiveButtonLoading={isLoading}
        positiveButtonTitle="Update category"
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialFieldRefForFocus}
      >
        <UpdateCategoryForm
          closeModal={onClose}
          setPositiveButtonLoading={setIsLoading}
          formRef={formRef}
          categorySlug={slug}
          categoryName={name}
          categoryId={id}
          initialRef={initialFieldRefForFocus}
        />
      </AppModal>
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
        <MenuItem icon={<DeleteIcon />} onClick={() => deleteCategory()}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Category;
