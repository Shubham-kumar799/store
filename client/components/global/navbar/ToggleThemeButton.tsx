import { FC } from 'react';

//comopnents
import { Button, useColorMode } from '@chakra-ui/react';

//icons
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ToggleThemeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button colorScheme={'brand.primary'} onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ToggleThemeButton;
