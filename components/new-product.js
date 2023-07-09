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

export default function NewProduct({isOpen, onClose, setData, setLoading}){

    const [newProduct, setNewProduct] = useState({
        prod_desc : "",
        prod_cat : "",
        retail_price : "",
        wsale_price : ""
    });
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/product-types').then(res => res.json()).then((data) => {
            setCategories(data.map( cat => <option key={cat.id} value={cat.id}>{ cat.type_desc }</option>));
        });
    }, []);



    function handleProdDescChange(e){
        let product = {...newProduct, prod_desc: e.target.value};
        
        setNewProduct(product)
    }

    function handleCategoryChange(e){
        let product = { ...newProduct, prod_cat: e.target.value};
        setNewProduct(product);
    }

    function handleRetailPriceChange(e){
        let product = { ...newProduct, retail_price: e.target.value };
        setNewProduct(product);

    }

    function handleWholesalePriceChange(e){
        let product = {...newProduct, wsale_price : e.target.value}
        setNewProduct(product);

    }

    async function saveProduct(e){
        await fetch('http://127.0.0.1:3000/products', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        onClose();
        setData(null);
        setLoading(true);

        fetch('http://127.0.0.1:3000/products').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });

    }

    return (
        <>
        
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>New Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Box m={5}>
                    <Input placeholder='Description' value={ newProduct.prod_desc } onChange={ handleProdDescChange } />
                </Box>
                <Box m={5}>
                    <Select placeholder='Product Type' value={ newProduct.prod_cat } onChange= { handleCategoryChange }>
                        { categories }
                    </Select>
                </Box>
                <Box m={5}>
                    <Input placeholder='Retail Price' value={ newProduct.retail_price } onChange={ handleRetailPriceChange } />
                </Box>

                <Box m={5}>
                    <Input placeholder='Wholesale Price' value={ newProduct.wsale_price } onChange={ handleWholesalePriceChange } />
                </Box>
                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={ saveProduct }>
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