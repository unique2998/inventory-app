import { useState, useEffect } from "react";
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


export default function NewCustomer({isOpen, onClose, data, mutate}){

    const [newCustomer, setNewCustomer] = useState({
        lastname : "",
        firstname : "",
        address : "",
        loyalty_card_number : "",
    });
    

    function handleCustomerLNameChange(e){
        let customer = {...newCustomer, lastname: e.target.value};
        
        setNewCustomer(customer)
    }

    function handleCustomerFNameChange(e){
        let customer = {...newCustomer, firstname: e.target.value};
        
        setNewCustomer(customer)
    }

    

    function handleLoyaltyChange(e){
        let customer = { ...newCustomer, loyalty_card_number: e.target.value };
        setNewCustomer(customer);

    }

    function handleAddressChange(e){
        let customer = { ...newCustomer, address: e.target.value };
        setNewCustomer(customer);

    }



    async function saveCustomer(e){
        await fetch('http://127.0.0.1:3000/customers', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>New Customer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Box m={5}>
                    <Input placeholder='Last Name' value={ newCustomer.lastname } onChange={ handleCustomerLNameChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='First Name' value={ newCustomer.firstname } onChange={ handleCustomerFNameChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Address' value={ newCustomer.address } onChange={ handleAddressChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Loyalty Card ID' value={ newCustomer.loyalty_card_number } onChange={ handleLoyaltyChange } />
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