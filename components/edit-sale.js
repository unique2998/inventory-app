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


export default function EditSale({isOpen, onClose, data, mutate, currentSale, setCurrentSale}){
    

    const { data : products_data} = useSWR('http://127.0.0.1:3000/products', fetcher);
    const { data : customers_data} = useSWR('http://127.0.0.1:3000/customers', fetcher);
    
    let products = [];
    let customers = [];

    if(products_data){
        products = products_data.map((product) => {
            return <option key={product.id} value={product.id}>{ product.prod_desc }</option>;
        });
    }

    if(customers_data){
        customers = customers_data.map((cust) => {
            return <option key={cust.id} value={cust.id}>{ cust.firstname } { cust.lastname }</option>;
        });
    }

    function handleProductChange(e){
        let sale = {...currentSale, product_id: e.target.value};
        
        setCurrentSale(sale)
    }



    function handleQtyChange(e){
        let sale = {...currentSale, qty: e.target.value};
        
        setCurrentSale(sale)
    }

    function handleCustomerChange(e){
        let sale = {...currentSale, customer_id: e.target.value};
        
        setCurrentSale(sale)
    }



    async function saveSale(e){
        await fetch('http://127.0.0.1:3000/sales', {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentSale)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Sale Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Select value={ currentSale.product_id } onChange= { handleProductChange }>
                        <option value={-1}>Please select</option>
                        { products }
                </Select>

                <Box m={5}>
                    <Input placeholder='Quantity' value={ currentSale.qty } onChange={ handleQtyChange } />
                </Box>

                <Select value={ currentSale.customer_id } onChange= { handleCustomerChange }>
                        <option value={-1}>Please select</option>
                        { customers }
                </Select>

                
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ saveSale }>
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