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


import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function EditStock({isOpen, onClose, data, mutate, currentStock, setCurrentStock}){
    

    const { data : products_data} = useSWR('http://127.0.0.1:3000/products', fetcher);
    const { data : suppliers_data} = useSWR('http://127.0.0.1:3000/suppliers', fetcher);
    
    let products = [];
    let suppliers = [];

    if(products_data){
        products = products_data.map((product) => {
            return <option key={product.id} value={product.id}>{ product.prod_desc }</option>;
        });
    }

    if(suppliers_data){
        suppliers = suppliers_data.map((supp) => {
            return <option key={supp.id} value={supp.id}>{ supp.supplier }</option>;
        });
    }

    function handleProductChange(e){
        let stock = {...currentStock, product_id: e.target.value};
        
        setCurrentStock(stock)
    }


    function handleRemarksChange(e){
        let stock = {...currentStock, remarks: e.target.value};
        
        setCurrentStock(stock)
    }


    function handleQtyChange(e){
        let stock = {...currentStock, qty: e.target.value};
        
        setCurrentStock(stock)
    }

    function handleSupplierChange(e){
        let stock = {...currentStock, supplier_id: e.target.value};
        
        setCurrentStock(stock)
    }



    async function saveStock(e){
        await fetch('http://127.0.0.1:3000/stocks', {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentStock)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Stock Import</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Select  value={ currentStock.product_id } onChange= { handleProductChange }>
                        <option value={-1}>Please select</option>
                        { products }
                </Select>
                
                <Box m={5}>
                    <Input placeholder='Remarks' value={ currentStock.remarks } onChange={ handleRemarksChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Quantity' value={ currentStock.qty } onChange={ handleQtyChange } />
                </Box>

                <Select  value={ currentStock.supplier_id } onChange= { handleSupplierChange }>
                        <option value={-1}>Please select</option>
                        { suppliers }
                </Select>

                
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ saveStock }>
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