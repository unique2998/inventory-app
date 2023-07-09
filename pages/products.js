import Layout from '../components/layout';
import NewProduct from '../components/new-product';
import EditProduct from '../components/edit-product';
import { 
    Heading, 
    Box, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Skeleton, 
    Stack,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter, 
    Select,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
    
} from '@chakra-ui/react';

import { useState, useEffect, useRef } from 'react';
import { FaBuffer, FaMinusCircle, FaPencilAlt } from 'react-icons/fa';
import { startOptimizedAppearAnimation } from 'framer-motion';


export default function Products(){

    let content;

    const [ data, setData ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);
    const { isOpen: isOpenNewProduct, onOpen: onOpenNewProduct, onClose: onCloseNewProduct } = useDisclosure();
    const { isOpen: isOpenEditProduct, onOpen: onOpenEditProduct, onClose: onCloseEditProduct } = useDisclosure();
    const { isOpen: isOpenDeleteProduct, onOpen: onOpenDeleteProduct, onClose: onCloseDeleteProduct } = useDisclosure();
    const [currentProduct, setCurrentProduct] = useState({
        id : "-1",
        prod_desc : "",
        prod_cat : "",
        retail_price : "",
        wsale_price : ""
    });
    const cancelRef = useRef();
    useEffect(() => {
        fetch('http://127.0.0.1:3000/products').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });
    }, []);


    if(isLoading){
        content = (
            <Stack>
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
                <Skeleton height='30px' />
            </Stack>
        );
    }

    if(data){

        let products = data.map((prod) => {
            return (
                <Tr key={prod.id}>
                    <Td>{ prod.id }</Td>
                    <Td>{ prod.prod_desc }</Td>
                    <Td>{ prod.type_desc }</Td>
                    <Td>{ prod.retail_price }</Td>
                    <Td>{ prod.wsale_price }</Td>
                    <Td><Button leftIcon={<FaPencilAlt />} colorScheme='yellow' variant='solid' onClick={ () => { editProduct(prod) } } >Edit</Button><Button ml={5} leftIcon={<FaMinusCircle />} colorScheme='red' variant='solid' onClick={ () => { deleteProduct(prod) } } >Delete</Button></Td>
                </Tr>
            );
        })


        content = (
            <>
              <NewProduct isOpen={isOpenNewProduct} onClose={onCloseNewProduct} setData={setData} setLoading={setLoading}  />
              <EditProduct isOpen={isOpenEditProduct} onClose={onCloseEditProduct} setData={setData} setLoading={setLoading} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
              <AlertDialog
                    isOpen={isOpenDeleteProduct}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseDeleteProduct}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseDeleteProduct}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={handleDeleteProduct} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
              
              <Box m={5}>
                  <Button leftIcon={<FaBuffer />} colorScheme='teal' variant='solid' onClick={ handleAddNewProduct }>Add</Button>
              </Box>
 
                <TableContainer>
                <Table variant='simple'>
                    <TableCaption></TableCaption>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Product Description</Th>
                        <Th>Type</Th>
                        <Th>Retail Price</Th>
                        <Th>Wholesale Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Thead>
                    <Tbody>{ products }</Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Product Description</Th>
                        <Th>Type</Th>
                        <Th>Retail Price</Th>
                        <Th>Wholesale Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                    </Tfoot>
                </Table>
                </TableContainer>
            </>
        );
    }

    function handleAddNewProduct(e){
        onOpenNewProduct();
    }


    function editProduct(prod){
        setCurrentProduct(prod);
        onOpenEditProduct();
    }


    function deleteProduct(prod){
        onOpenDeleteProduct();
        setCurrentProduct(prod);
    }


    async function handleDeleteProduct(e){
        await fetch('http://127.0.0.1:3000/products', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentProduct)
        });

        onCloseDeleteProduct();
        setData(null);
        setLoading(true);

        fetch('http://127.0.0.1:3000/products').then((res) => res.json()).then((data) => {
            setLoading(false);
            setData(data);
        });        
    }





 
    





    return (
        <Layout title="Products">
            <Heading>List of Products</Heading>
            <Card m={8}>
            <CardBody>
                { content }
            </CardBody>
            </Card>
        </Layout>
    );
}

