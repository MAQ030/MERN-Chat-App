import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

const ChatLoading = () => {
  return (
    <Center height="70vh">
      <Spinner size="xl" thickness="4px" color="black.500" emptyColor="gray.200" />
    </Center>
  );
};

export default ChatLoading;
