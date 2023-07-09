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

export default function NewStock({isOpen, onClose, data, mutate}){
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
    
    const [newStock, setNewStock] = useState({
        product_id : -1,
        remarks : "",
        qty : 0,
        supplier_id : -1
    });
    

    function handleProductChange(e){
        let stock = {...newStock, product_id: e.target.value};
        
        setNewStock(stock)
    }


    function handleRemarksChange(e){
        let stock = {...newStock, remarks: e.target.value};
        
        setNewStock(stock)
    }


    function handleQtyChange(e){
        let stock = {...newStock, qty: e.target.value};
        
        setNewStock(stock)
    }

    function handleSupplierChange(e){
        let stock = {...newStock, supplier_id: e.target.value};
        
        setNewStock(stock)
    }

    

    



    async function saveStock(e){
        await fetch('http://127.0.0.1:3000/stocks', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStock)
        });

        onClose();
        mutate(data);

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Import Stocks</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Select value={ newStock.product_id } onChange= { handleProductChange }>
                        <option value={-1}>Please select</option>
                        { products }
                </Select>
                
                <Box m={5}>
                    <Input placeholder='Remarks' value={ newStock.remarks } onChange={ handleRemarksChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Quantity' value={ newStock.qty } onChange={ handleQtyChange } />
                </Box>

                <Select value={ newStock.supplier_id } onChange= { handleSupplierChange }>
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