import { useState} from "react";
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

export default function NewSale({isOpen, onClose, data, mutate}){
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
    
    const [newSale, setNewSale] = useState({
        product_id : -1,
        qty : 0,
        customer_id : -1
    });
    

    function handleProductChange(e){
        let sale = {...newSale, product_id: e.target.value};
        
        setNewSale(sale)
    }



    function handleQtyChange(e){
        let sale = {...newSale, qty: e.target.value};
        
        setNewSale(sale)
    }

    function handleCustomerChange(e){
        let sale = {...newSale, customer_id: e.target.value};
        
        setNewSale(sale)
    }

    

    



    async function saveSale(e){
        await fetch('http://127.0.0.1:3000/sales', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSale)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>New Sale</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Select value={ newSale.product_id } onChange= { handleProductChange }>
                        <option value={-1}>Please select</option>
                        { products }
                </Select>

                <Box m={5}>
                    <Input placeholder='Quantity' value={ newSale.qty } onChange={ handleQtyChange } />
                </Box>

                <Select value={ newSale.customer_id } onChange= { handleCustomerChange }>
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