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





export default function EditSupplier({isOpen, onClose, data, mutate, currentSupplier, setCurrentSupplier}){
    

    function handleSupplierNameChange(e){
        let supplier = {...currentSupplier, supplier: e.target.value};
        
        setCurrentSupplier(supplier)
    }

    

    function handleAddressChange(e){
        let supplier = { ...currentSupplier, address: e.target.value };
        setCurrentSupplier(supplier);

    }



    async function saveSupplier(e){
        await fetch('http://127.0.0.1:3000/suppliers', {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentSupplier)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Supplier</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Box m={5}>
                    <Input placeholder='Supplier Name' value={ currentSupplier.supplier } onChange={ handleSupplierNameChange } />
                </Box>
                
                <Box m={5}>
                    <Input placeholder='Address' value={ currentSupplier.address } onChange={ handleAddressChange } />
                </Box>

                
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ saveSupplier }>
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