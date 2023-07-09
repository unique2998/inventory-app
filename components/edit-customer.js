import { useState } from "react";
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
    Input,
    Select,
    ModalFooter,
    Button

} from "@chakra-ui/react";





export default function EditCustomer({isOpen, onClose, data, mutate, currentCustomer, setCurrentCustomer}){
    

    function handleCustomerLNameChange(e){
        let customer = {...currentCustomer, lastname: e.target.value};
        
        setCurrentCustomer(customer)
    }

    function handleCustomerFNameChange(e){
        let customer = {...currentCustomer, firstname: e.target.value};
        
        setCurrentCustomer(customer)
    }

    

    function handleLoyaltyChange(e){
        let customer = { ...currentCustomer, loyalty_card_number: e.target.value };
        setCurrentCustomer(customer);

    }

    function handleAddressChange(e){
        let customer = { ...currentCustomer, address: e.target.value };
        setCurrentCustomer(customer);

    }



    async function saveCustomer(e){
        await fetch('http://127.0.0.1:3000/customers', {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentCustomer)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Customer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Box m={5}>
                    <Input placeholder='Last Name' value={ currentCustomer.lastname } onChange={ handleCustomerLNameChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='First Name' value={ currentCustomer.firstname } onChange={ handleCustomerFNameChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Address' value={ currentCustomer.address } onChange={ handleAddressChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Loyalty Card ID' value={ currentCustomer.loyalty_card_number } onChange={ handleLoyaltyChange } />
                </Box>

                
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ saveCustomer }>
                    Save
                    </Button>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        
        
        </>
    );
}