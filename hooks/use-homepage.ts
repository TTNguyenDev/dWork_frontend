import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useBlockchain } from '../core/hooks';

export const useHomepage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // btn launch app
  const btnLaunchAppOnClick = useCallback(() => {
    router.push('/explore');
  }, [router]);

  // demo video
  const demoVideoOnClick = useCallback(() => {
    onOpen();
  }, []);
  const modalDemoVideoOnClose = useCallback(() => {
    onClose();
  }, []);
  const modalDemoVideoIsOpen = isOpen;

  return {
    homepageState: {
      modalDemoVideoIsOpen,
    },
    homepageMethods: {
      btnLaunchAppOnClick,
      demoVideoOnClick,
      modalDemoVideoOnClose,
    },
  };
};
