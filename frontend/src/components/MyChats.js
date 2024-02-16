import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "",
      });
    }
  };  

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain])
  

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="3xl"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Poppins"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center" 
        letterSpacing="wide"
      >
        Chats


        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg:"17px" }}
            rightIcon={<AddIcon/>}
          >
            <img width="26" height="26" src="https://img.icons8.com/sf-regular-filled/48/groups.png" alt="groups"/>
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F1F3F4"
        w="100%"
        h="100%"
        borderRadius="3xl"
        overflowY="hidden"
        fontFamily="Poppins"
        
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
cursor="pointer"
  bg={selectedChat === chat ? "#1A1E21" : "#DEE1E6"} // Dark blue when selected, Light blue otherwise
  color={selectedChat === chat ? "#FFFFFF" : "#1A1E21"} // White when selected, Dark blue otherwise
  px={3}
  py={2}
  borderRadius="2xl"
  key={chat._id}
  _hover={{
    bg: selectedChat === chat ? "#0F1215" : "#D9E2EC", // Darker blue when selected, Lighter blue otherwise
    color: selectedChat === chat ? "#FFFFFF" : "#1A1E21", // White when selected, Dark blue otherwise
  }}
              >
                <Text>
                  {!chat.isGroupChat ? (getSender(loggedUser, chat.users)) : (chat.chatName)}
                </Text>
              </Box>
            ))}
          </Stack>
        ): (
          <ChatLoading/>
        )}

      </Box>
    </Box>
  )
}

export default MyChats