//components
import { Center, Spinner } from '@chakra-ui/react';

//types
import { FC } from 'react';

const AppSpinner: FC = () => {
  return (
    <Center alignItems={'center'} justifyContent="center">
      <Spinner alignSelf={'center'} />
    </Center>
  );
};

export default AppSpinner;
