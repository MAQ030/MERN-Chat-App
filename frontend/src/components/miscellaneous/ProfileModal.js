import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,

} from '@chakra-ui/react'
import React from "react";

const ProfileModal = ({user, children}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        < span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon/>} onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent h="340px" borderRadius="3xl">
          <ModalHeader 
          fontSize="32px" 
          fontFamily="Poppins" 
          //fontFamily="monospace"
          //fontWeight="bold" // Increase font weight for a more substantial look
          display="flex" 
          justifyContent="center"
            letterSpacing="Normal"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
            <Image
              borderRadius='full'
              boxSize='160px'
              src={user.pic}
              alt={user.name}
              objectFit="cover"
            />
            <Text
              fontSize={{ base: "16px", md: "16px" }}
              fontFamily= "Poppins"
              fontWeight="medium"
              color="#535353"
              mt={3}
              letterSpacing="tighter" // Add letter spacing for a more modern look

            >
              Email Address: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



    </>
  )
}

export default ProfileModal