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

import useSWR from 'swr';



export default function NewSupplier({isOpen, onClose, data, mutate}){

    const [newSupplier, setNewSupplier] = useState({
        supplier : "",
        address : ""
    });
    

    function handleSupplierNameChange(e){
        let supplier = {...newSupplier, supplier: e.target.value};
        
        setNewSupplier(supplier)
    }

    

    function handleAddressChange(e){
        let supplier = { ...newSupplier, address: e.target.value };
        setNewSupplier(supplier);

    }



    async function saveSupplier(e){
        await fetch('http://127.0.0.1:3000/suppliers', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSupplier)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>New Supplier</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Box m={5}>
                    <Input placeholder='Supplier Name' value={ newSupplier.supplier } onChange={ handleSupplierNameChange } />
                </Box>
                
                <Box m={5}>
                    <Input placeholder='Address' value={ newSupplier.address } onChange={ handleAddressChange } />
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